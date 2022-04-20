import { Box, IconButton, ThemeOptions, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { SwSidebar, SwLayout, SwButton } from 'sw-web-shared';
import { useSelector } from 'react-redux';
import { environment, EnvMode } from '@api/environment';
import {
  activatePartnersAgreement,
  ActivationSucessful,
  IntegrateAgreement,
  IntegrateAgreementCommunityAddr,
  IntegrateErrorMessage,
  IntegrateLoadingMessage,
  integrateSetAgreementKey,
  IntegrateStatus,
  integrateUpdateStatus,
  resetIntegrateState,
} from '@store/Integrate/integrate';
import { createPartnersAgreement, createPartnersCommunity } from '@api/registry.api';
import { useAppDispatch } from '@store/store.model';
import { Community, CommunityRole, DefaultRoles } from '@api/community.model';
import { setPreviusRoute } from '@store/ui-reducer';
import LoadingDialog from '@components/LoadingPopup';
import { ResultState } from '@store/result-status';
import MenuIcon from '@mui/icons-material/Menu';
import { useForm } from 'react-hook-form';
import ErrorDialog from '@components/ErrorPopup';
import { useHistory } from 'react-router-dom';
import TemplateStep, { IntegrationTemplates } from './TemplateStep/TemplateStep';
import ValidatePAAccessKeyDialog from './ValidatePAAccessKeyDialog';
import ActivateCommunityDialog from './ActivateCommunityDialog';
import IntegrationWelcome from './IntegrationWelcome';
import CommunityInfoStep from './CommunityInfoStep/CommunityInfoStep';
import './PartnerIntegration.scss';

const PartnerIntegration = () => {
  const dispatch = useAppDispatch();
  const small = useMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('md'));
  const [opened, setOpened] = useState(true);
  const [isActivateKeyOpen, setIsActivateKeyOpen] = useState(true);
  const [hasRetry, setHasRetry] = useState(true);
  const history = useHistory();

  const status = useSelector(IntegrateStatus);
  const agreement = useSelector(IntegrateAgreement);
  const communityAddress = useSelector(IntegrateAgreementCommunityAddr);
  const errorMessage = useSelector(IntegrateErrorMessage);
  const isActivationSuccessful = useSelector(ActivationSucessful);
  const loadingMessage = useSelector(IntegrateLoadingMessage);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      avatar: null,
      description: null,
      name: null,
      template: null,
      numOfActions: 0,
      roles: [
        {
          id: 1,
          roleName: '',
          skills: [],
          isCoreTeamMember: false,
        },
        {
          id: 2,
          roleName: '',
          skills: [],
          isCoreTeamMember: false,
        },
        {
          id: 3,
          roleName: '',
          skills: [],
          isCoreTeamMember: false,
        },
      ] as CommunityRole[],
      startFromScratch: false,
      importedContract: false,
    },
  });
  const values = watch();
  const handleToggle = () => setOpened(!opened);

  const handleActivation = (key: string) => {
    setIsActivateKeyOpen(false);
    dispatch(integrateSetAgreementKey(key));
  };

  const onActivateCommunity = async () => {
    const { communityAddr, partnersAddr, key } = agreement;
    console.log(communityAddr);
    await dispatch(activatePartnersAgreement({ communityAddr, partnersAddr, partnerKey: key }));
  };

  const createAgreement = async (closeStatus: 'close' | 'retry' = null) => {
    const community = new Community({
      name: values.name,
      description: values.description,
      image: values.avatar,
      properties: {
        template: IntegrationTemplates[values.template].title,
        skills: {
          roles: [...values.roles, ...DefaultRoles],
        },
      },
    });

    let result = null;

    if (!communityAddress || closeStatus !== 'retry') {
      result = await dispatch(
        createPartnersCommunity({
          metadata: community,
          selectedTemplate: values.template,
        })
      );
    }

    if (result?.meta?.requestStatus !== 'rejected') {
      dispatch(
        createPartnersAgreement({
          community,
          numOfActions: values.numOfActions,
          contractAddress: null,
        })
      );
    }
  };

  const handleDialogClose = (closeStatus: 'close' | 'retry' = null) => {
    if (!isActivationSuccessful && agreement) {
      if (closeStatus !== 'retry') {
        history.push('/');
        return;
      }
      onActivateCommunity();
      return;
    }
    dispatch(integrateUpdateStatus(ResultState.Idle));
    if (closeStatus === 'retry') {
      createAgreement(closeStatus);
    }
  };

  const onSubmit = (data: any) => {
    createAgreement();
  };

  const onError = (data: any) => {
    // error
  };

  useEffect(() => {
    dispatch(setPreviusRoute('/'));
    console.log('Previous route from Partner integration');
  }, [dispatch]);

  useEffect(() => {
    if (small) {
      setOpened(false);
    } else {
      setOpened(true);
    }
  }, [small]);

  useEffect(
    () => () => {
      dispatch(resetIntegrateState());
    },
    [dispatch]
  );

  return (
    <>
      <ActivateCommunityDialog
        agreementKey={agreement?.key}
        onActivateCommunity={onActivateCommunity}
        handleClose={handleDialogClose}
        open={status === ResultState.Success}
      />
      <ErrorDialog
        hasRetry
        mode="dark"
        handleClose={handleDialogClose}
        open={status === ResultState.Failed}
        message={errorMessage || 'Something went wrong'}
      />
      <LoadingDialog
        mode="dark"
        handleClose={handleDialogClose}
        open={status === ResultState.Updating}
        message={loadingMessage || 'Signing agreement...'}
      />
      <form autoComplete="off" className="sw-integrate-base-container" onSubmit={handleSubmit(onSubmit, onError)}>
        <SwLayout
          hideTop
          disableGutters
          scrollbarStyles={{ margin: '24px', width: 'auto', border: '1px solid', height: 'calc(100% - 48px)' }}
          top={null}
          drawer={
            <SwSidebar
              width="460px"
              mode="close"
              preventClose
              handleToggle={handleToggle}
              sidebarTopIcon={null}
              mobile={small}
              open={opened}
              sx={{ paddingX: 0 }}
            >
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  height: 'calc(100% - 40px)',
                  width: 'auto',
                  p: '20px',
                }}
              >
                <Box
                  sx={{
                    height: 'calc(100% - 40px)',
                    p: '20px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'text.primary',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {values.template === null ? (
                    <IntegrationWelcome />
                  ) : (
                    <CommunityInfoStep errors={errors} values={values} control={control} />
                  )}
                </Box>
              </Box>
            </SwSidebar>
          }
        >
          {isActivateKeyOpen && environment.env === EnvMode.Production ? (
            <ValidatePAAccessKeyDialog handleActivation={handleActivation} handleClose={handleDialogClose} open={isActivateKeyOpen} />
          ) : (
            <Box
              sx={{
                p: 0,
                m: 0,
                gridGap: '0',
              }}
              className="sw-box"
            >
              <div className="sw-menu-icon">
                {small && (
                  <Tooltip title="Open sidebar" placement="right" color="white">
                    <IconButton className="sw-toolbar-button" color="primary" onClick={handleToggle}>
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>

              <Typography sx={{ mb: '10px' }} color="primary" variant="h1" component="div">
                Partner’s Agreement
              </Typography>
              <Typography color="primary" variant="h2" component="div">
                Select the Market that best represents your Community / protocol.
              </Typography>
              <TemplateStep values={values} control={control} errors={errors} />
              <div className="bottom-action">
                <SwButton mode="light" type="submit" label="Sign & Deploy 🚀" />
              </div>
            </Box>
          )}
        </SwLayout>
      </form>
    </>
  );
};

export default PartnerIntegration;
