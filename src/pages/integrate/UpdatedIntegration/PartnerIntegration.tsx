import { Box, IconButton, ThemeOptions, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { SwSidebar, SwLayout, SwButton } from 'sw-web-shared';
import { useDispatch, useSelector } from 'react-redux';
import { environment, EnvMode } from '@api/environment';
import {
  IntegrateAgreement,
  integratePartnerAgreement,
  integrateSetAgreementKey,
  IntegrateStatus,
  integrateUpdateStatus,
  resetIntegrateState,
} from '@store/Integrate/integrate';
import { setPreviusRoute } from '@store/ui-reducer';
import LoadingDialog from '@components/LoadingPopup';
import { ResultState } from '@store/result-status';
import MenuIcon from '@mui/icons-material/Menu';
import { useForm } from 'react-hook-form';
import { CommunityIntegration } from '@api/api.model';
import ErrorDialog from '@components/ErrorPopup';
import TemplateStep, { IntegrationTemplates } from './TemplateStep/TemplateStep';
import ValidatePAAccessKeyDialog from './ValidatePAAccessKeyDialog';
import ActivateCommunityDialog from './ActivateCommunityDialog';
import IntegrationWelcome from './IntegrationWelcome';
import CommunityInfoStep from './CommunityInfoStep/CommunityInfoStep';
import './PartnerIntegration.scss';

const DefaultRoles = [
  {
    credits: 24,
    roleName: 'Advisor',
    skills: [],
    isCoreTeamMember: true,
  },
  {
    credits: 12,
    roleName: 'Core Team',
    skills: [],
    isCoreTeamMember: true,
  },
  {
    credits: 6,
    roleName: 'Investor',
    skills: [],
    isCoreTeamMember: true,
  },
];

const PartnerIntegration = () => {
  const dispatch = useDispatch();
  const small = useMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('md'));
  const [opened, setOpened] = useState(true);
  const [isActivateKeyOpen, setIsActivateKeyOpen] = useState(true);

  const status = useSelector(IntegrateStatus);
  const agreement = useSelector(IntegrateAgreement);

  useEffect(() => {
    const event = new CustomEvent('hideSwButton');
    window.dispatchEvent(event);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
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
          credits: 24,
          roleName: '',
          skills: [],
          isCoreTeamMember: false,
        },
        {
          credits: 12,
          roleName: '',
          skills: [],
          isCoreTeamMember: false,
        },
        {
          credits: 6,
          roleName: '',
          skills: [],
          isCoreTeamMember: false,
        },
      ],
      startFromScratch: true,
      importedContract: false,
    },
  });
  const values = watch();
  const handleToggle = () => setOpened(!opened);

  const handleActivation = (key: string) => {
    setIsActivateKeyOpen(false);
    dispatch(integrateSetAgreementKey(key));
  };

  const handleDialogClose = () => {
    dispatch(integrateUpdateStatus(ResultState.Idle));
  };

  const onActivateCommunity = () => {
    handleDialogClose();
    const { communityAddr, partnersAddr, key } = agreement;
    const event = new CustomEvent('activateSkillwalletCommunity', {
      detail: {
        communityAddr,
        partnersAddr,
        partnerKey: key,
      },
    });
    window.dispatchEvent(event);
  };

  const createAgreement = () => {
    const metadata: CommunityIntegration = {
      title: values.name,
      description: values.description,
      image: values.avatar,
      properties: {
        template: IntegrationTemplates[values.template].title,
      },
      skills: {
        roles: [...values.roles, ...DefaultRoles],
      },
    };
    dispatch(
      integratePartnerAgreement({
        metadata,
        numOfActions: values.numOfActions,
        contractAddress: null,
        selectedTemplate: values.template,
      })
    );
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
      <ErrorDialog mode="dark" handleClose={handleDialogClose} open={status === ResultState.Failed} message="Something went wrong" />
      <LoadingDialog mode="dark" handleClose={handleDialogClose} open={status === ResultState.Updating} message="Signing agreement..." />
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
              <TemplateStep values={values} control={control} />

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
