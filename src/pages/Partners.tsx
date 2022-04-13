import { useCallback, useEffect, useState } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { SwLayout, SwSidebar, SwMenuItems } from 'sw-web-shared';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, IconButton, Tooltip, Typography, Avatar, Button, Theme, Box } from '@mui/material';
import { ReactComponent as DaoStatsIcon } from '@assets/dao-stats.svg';
import { ReactComponent as DashboardIcon } from '@assets/dashboard.svg';
import { ReactComponent as IntegrationIcon } from '@assets/integration.svg';
import { ReactComponent as EventFactoryIcon } from '@assets/event-badge.svg';
import { KeyboardArrowLeft } from '@mui/icons-material';
import MembersAndActivities from '@components/member-and-activities/MembersAndActivities';
import { useSelector } from 'react-redux';
import { fetchCommunity } from '@store/Community/community.reducer';
import { setPreviusRoute } from '@store/ui-reducer';
import { RootState, useAppDispatch } from '@store/store.model';
import NotFound from '@components/NotFound';
import CoreTeam from './core-team/CoreTeam';
import Community from './community/Community';
import Contracts from './integrations-and-contracts/contracts/Contracts';
import Dashboard from './deshboard/Dashboard';
import DaoIntegration from './integrations-and-contracts/dao-integration/DaoIntegration';
import IntegrationDashboard from './integrations-and-contracts/dashboard/IntegrationDashboard';
import CoreTeamWhitelist from './core-team/core-team-whitelist/CoreTeamWhitelist';
import EventFactoryDashboard from './event-factory/EventFactoryDashboard/EventFactoryDashboard';
import CreateTask from './event-factory/CreateTask/CreateTask';
import SuccessStep from './event-factory/CreateTask/SuccessStep/SuccessStep';
import Tasks from './event-factory/Tasks/Tasks';
import TaskDetails from './event-factory/Tasks/TaskDetails';
import TaskSubmit from './event-factory/Tasks/TaskSubmit';

import './partners.scss';
import DiscordIntegration from './integrations-and-contracts/discord-integration/DiscordIntegration';
import GroupCall from './event-factory/GroupCall/GroupCall';
import Roles from './Roles/Roles';

const Partners = (props) => {
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(true);
  const small = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const location = useLocation();

  const handleToggle = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { previousRoute } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (location.pathname === '/partner/dashboard') {
      dispatch(setPreviusRoute('/'));
    }

    console.log('Previous route from Partners');
  }, [dispatch, location]);

  useEffect(() => {
    if (userInfo?.community) {
      const promise = dispatch(fetchCommunity(userInfo?.community));
      return () => promise.abort();
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (small) {
      setOpened(false);
    } else {
      setOpened(true);
    }
  }, [small]);

  const menuItems = [
    {
      type: 'href',
      label: 'Dashboard',
      href: '/partner/dashboard',
      icon: <SvgIcon component={DashboardIcon} />,
    },
    {
      type: 'href',
      label: 'Integrations & Contracts',
      href: '/partner/integrations-and-contracts',
      icon: <SvgIcon component={IntegrationIcon} />,
    },
    {
      type: 'href',
      label: 'Event Factory',
      href: '/partner/event-factory',
      icon: <SvgIcon component={EventFactoryIcon} />,
    },
    {
      type: 'href',
      label: 'DAO Stats',
      href: '/core-team',
      disabled: true,
      icon: <SvgIcon component={DaoStatsIcon} />,
    },
  ];

  return (
    <>
      <SwLayout
        className="partner-layout-wrapper"
        hideTop
        disableGutters
        scrollbarStyles={{
          margin: '24px',
          width: 'auto',
          // padding: '90px 65px',
          border: '2px solid',
          height: 'calc(100% - 48px)',
        }}
        drawer={
          <SwSidebar
            className="parner"
            handleToggle={handleToggle}
            sidebarTopIcon={null}
            mobile={small}
            open={opened}
            mode="dock"
            width="230px"
            preventClose={false}
            sx={{
              backgroundColor: 'black',
            }}
          >
            <>
              <div className="sw-user-info">
                <Avatar
                  className="sw-profile-pic"
                  src={userInfo?.imageUrl}
                  sx={{
                    width: !opened ? 60 : 87,
                    height: !opened ? 60 : 87,
                    border: '2px solid white',
                  }}
                />
                <Typography sx={{ color: 'background.paper', textAlign: 'center', my: 2 }} component="div" variant="h1">
                  {userInfo?.nickname}
                </Typography>
              </div>
              <SwMenuItems handleToggle={handleToggle} mobile={small} open={opened} menuItems={menuItems} />
            </>
          </SwSidebar>
        }
      >
        <>
          <div className="sw-menu-icon">
            {small && (
              <Tooltip title="Open sidebar" placement="right" color="white">
                <IconButton className="sw-toolbar-button" color="info" onClick={handleToggle}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <div className="back-button">
            <Button component={Link} to={previousRoute} size="small" color="primary">
              <KeyboardArrowLeft sx={{ marginTop: '-3px' }} />
              Back
            </Button>
          </div>

          <Box
            sx={{
              padding: '90px 65px',
              height: 'calc(100% - 180px)',
            }}
          >
            <Switch>
              {/* Partner */}
              <Route exact path="/partner/dashboard" component={Dashboard} {...props} />
              {/* Core Team Routes */}
              <Route exact path="/partner/dashboard/core-team" component={CoreTeam} {...props} />
              <Route
                exact
                path="/partner/dashboard/core-team/members"
                render={() => <MembersAndActivities {...props} isCoreTeamMembers />}
              />
              <Route exact path="/partner/dashboard/core-team/whitelist" component={CoreTeamWhitelist} {...props} />
              <Route exact path="/partner/dashboard/core-team/roles" render={() => <Roles {...props} isCoreTeam />} />
              <Route path="/partner/dashboard/core-team/tasks" exact component={Tasks} {...props} />
              <Route path="/partner/dashboard/core-team/tasks/:taskActivityId" exact component={TaskDetails} {...props} />
              <Route path="/partner/dashboard/core-team/tasks/:taskActivityId/submit" component={TaskSubmit} {...props} />
              {/* Partner > Community */}
              <Route exact path="/partner/dashboard/community" component={Community} {...props} />
              <Route
                exact
                path="/partner/dashboard/community/members"
                render={() => <MembersAndActivities {...props} isCoreTeamMembers={false} />}
              />
              <Route exact path="/partner/dashboard/community/roles" render={() => <Roles {...props} isCoreTeam={false} />} />

              {/* Partner> Integration and contracts */}
              <Route exact path="/partner/integrations-and-contracts" component={IntegrationDashboard} {...props} />
              <Route exact path="/partner/integrations-and-contracts/dao-integration" component={DaoIntegration} {...props} />
              <Route exact path="/partner/integrations-and-contracts/discord-integration" component={DiscordIntegration} {...props} />
              <Route exact path="/partner/integrations-and-contracts/contracts" component={Contracts} {...props} />

              {/* Event factory */}
              <Route exact path="/partner/event-factory" component={EventFactoryDashboard} {...props} />
              <Route path="/partner/event-factory/create-task" component={CreateTask} {...props} />
              {/* <Route path="/partner/event-factory/group-call" component={GroupCall} {...props} /> */}
              <Route path="/partner/event-factory/create-task-success" component={SuccessStep} {...props} />

              <Route component={NotFound} />
            </Switch>
          </Box>
        </>
      </SwLayout>
    </>
  );
};

export default Partners;
