import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import SidebarDrawer from '@components/Sidebar';
import { useSelector } from 'react-redux';
import { fetchCommunity } from '@api/community.api';
import { setPreviusRoute } from '@store/ui-reducer';
import { RootState, useAppDispatch } from '@store/store.model';
import NotFound from '@components/NotFound';
import MembersAndActivities from '@components/member-and-activities/MembersAndActivities';
import Community from './Community/Community';
import Dashboard from './deshboard/Dashboard';
import CoreTeam from './core-team/CoreTeam';
import CoreTeamWhitelist from './core-team/core-team-whitelist/CoreTeamWhitelist';
import Roles from './Roles/Roles';
import IntegrationDashboard from './integrations-and-contracts/dashboard/IntegrationDashboard';
import DaoIntegration from './integrations-and-contracts/dao-integration/DaoIntegration';
import DiscordIntegration from './integrations-and-contracts/discord-integration/DiscordIntegration';
import Contracts from './integrations-and-contracts/contracts/Contracts';
import EventFactoryDashboard from './event-factory/EventFactoryDashboard/EventFactoryDashboard';
import CreateTask from './event-factory/CreateTask/CreateTask';
import GroupCall from './event-factory/GroupCall/GroupCall';
import Polls from './event-factory/Polls/Polls';
import SuccessStep from './event-factory/CreateTask/SuccessStep/SuccessStep';
import Tasks from './event-factory/Tasks/Tasks';
import YourTasks from './event-factory/Tasks/YourTasks';
import TaskDetails from './event-factory/Tasks/TaskDetails';
import TaskSubmit from './event-factory/Tasks/TaskSubmit';

const Partners = (props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

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

  return (
    <>
      <SidebarDrawer>
        <Switch>
          {/* Partner */}
          <Route exact path="/partner/dashboard" component={Dashboard} {...props} />

          {/* Core Team Routes */}
          <Route exact path="/partner/core-team" component={CoreTeam} {...props} />
          <Route exact path="/partner/core-team/members" render={() => <MembersAndActivities {...props} isCoreTeamMembers />} />
          <Route exact path="/partner/core-team/whitelist" component={CoreTeamWhitelist} {...props} />
          <Route exact path="/partner/core-team/roles" render={() => <Roles {...props} isCoreTeam />} />

          {/* Partner > Community */}
          <Route exact path="/partner/community" component={Community} {...props} />
          <Route exact path="/partner/community/members" render={() => <MembersAndActivities {...props} isCoreTeamMembers={false} />} />
          <Route exact path="/partner/community/roles" render={() => <Roles {...props} isCoreTeam={false} />} />

          {/* Partner > Integration and contracts */}
          <Route exact path="/partner/integrations-and-contracts" component={IntegrationDashboard} {...props} />
          <Route exact path="/partner/integrations-and-contracts/dao-integration" component={DaoIntegration} {...props} />
          <Route exact path="/partner/integrations-and-contracts/discord-integration" component={DiscordIntegration} {...props} />
          <Route exact path="/partner/integrations-and-contracts/contracts" component={Contracts} {...props} />

          {/* Partner > Event factory */}
          <Route exact path="/partner/event-factory" component={EventFactoryDashboard} {...props} />
          <Route path="/partner/event-factory/create-task" component={CreateTask} {...props} />
          <Route path="/partner/event-factory/group-call" component={GroupCall} {...props} />
          <Route path="/partner/event-factory/polls" component={Polls} {...props} />
          <Route path="/partner/event-factory/create-task-success" component={SuccessStep} {...props} />

          {/* Partner > Tasks */}
          <Route exact path="/partner/tasks" component={Tasks} {...props} />
          <Route exact path="/partner/your-tasks" component={YourTasks} {...props} />
          <Route exact path="/partner/tasks/:taskActivityId" component={TaskDetails} {...props} />
          <Route path="/partner/tasks/:taskActivityId/submit" component={TaskSubmit} {...props} />

          <Route component={NotFound} />
        </Switch>
      </SidebarDrawer>
    </>
  );
};

export default Partners;
