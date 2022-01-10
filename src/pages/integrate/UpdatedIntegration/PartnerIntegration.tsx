import { Box, Button, IconButton, ThemeOptions, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { SwStepper, SwSidebar, SwLayout } from 'sw-web-shared';
import { Link, Route, Switch } from 'react-router-dom';
import { RootState } from '@store/store.model';
import { useDispatch, useSelector } from 'react-redux';
import { environment, EnvMode } from '@api/environment';
import { integrateSetAgreementKey, resetIntegrateState } from '@store/Integrate/integrate';
import { setPreviusRoute } from '@store/ui-reducer';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { ReactComponent as SwBlackLogo } from '@assets/sw-logo-black.svg';
import MenuIcon from '@mui/icons-material/Menu';
import TemplateStep from './TemplateStep/TemplateStep';
import CommunityInfoStep from './CommunityInfoStep/CommunityInfoStep';
import RolesStep from './RolesStep/RolesStep';
import ValidatePAAccessKeyDialog from './ValidatePAAccessKeyDialog';
import './PartnerIntegration.scss';

const PartnerIntegration = (props) => {
  const dispatch = useDispatch();
  const { description, title, activeStep, descriptionTooltip, stepperText, toPrevBtnPath } = useSelector(
    (state: RootState) => state.integrate.currentStep
  );
  const small = useMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('md'));
  const [steps] = useState([...Array(3)]);
  const [opened, setOpened] = useState(true);
  const [isActivateKeyOpen, setIsActivateKeyOpen] = useState(true);

  const handleToggle = () => setOpened(!opened);

  const handleDialogClose = () => {
    props.history.push('/');
  };

  const handleActivation = (key: string) => {
    setIsActivateKeyOpen(false);
    dispatch(integrateSetAgreementKey(key));
  };

  useEffect(() => {
    dispatch(setPreviusRoute('/'));
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
    <div className="sw-create-task-base-container">
      <SwLayout
        hideTop
        scrollbarStyles={{ height: '100%' }}
        top={null}
        drawer={
          <SwSidebar
            width="400px"
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
                  justifyContent: 'flex-end',
                }}
              >
                <Typography variant="h1" component="div" sx={{ mb: 6 }}>
                  This is your Partner's Agreement!
                </Typography>

                <SwBlackLogo
                  style={{
                    height: '100px',
                    width: 'auto',
                    marginBottom: '40px',
                    marginLeft: '-130px',
                  }}
                />

                <Typography variant="body1" component="div" sx={{ mb: 6 }}>
                  Here you can automate a role-based Governance for your DAO & integrate a pseudonymous, Sybil-resistant login for your
                  users.
                </Typography>
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
                  <IconButton className="sw-toolbar-button" color="info" onClick={handleToggle}>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <Box sx={{ maxWidth: activeStep !== 0 ? '650px' : '100%', flexGrow: 1 }} className="sw-box-right-inner">
              <SwStepper
                stepperText={stepperText}
                mode="dark"
                title={title}
                steps={steps}
                description={description}
                activeStep={activeStep}
                descriptionTooltip={descriptionTooltip}
                backButton={
                  <Button to={toPrevBtnPath || '/'} size="small" color="primary" component={Link}>
                    <KeyboardArrowLeft />
                    <span style={{ marginTop: '4px' }}>Back</span>
                  </Button>
                }
              />
              <Box className="sw-box" sx={{ maxWidth: activeStep === 0 ? '100%' : '450px', width: '100%', margin: '20px auto' }}>
                <Switch>
                  <Route exact path="/integrate" component={TemplateStep} {...props} />
                  <Route path="/integrate/roles" component={RolesStep} {...props} />
                  <Route path="/integrate/communtity-info" component={CommunityInfoStep} {...props} />
                </Switch>
              </Box>
            </Box>
          </Box>
        )}
      </SwLayout>
    </div>
  );
};

export default PartnerIntegration;
