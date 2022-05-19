import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import SidebarDrawer from '@components/Sidebar';
import { useSelector } from 'react-redux';
import { fetchCommunity } from '@api/community.api';
import { RootState, useAppDispatch } from '@store/store.model';
import NotFound from '@components/NotFound';
import MembersAndActivities from '@components/member-and-activities/MembersAndActivities';
import Community from './Community/Community';
import Dashboard from './Dashboard/Dashboard';
import CoreTeam from './CoreTeam/CoreTeam';
import CoreTeamWhitelist from './CoreTeamWhitelist/CoreTeamWhitelist';
import Roles from './Roles/Roles';
import EventFactory from './EventFactory/EventFactoryDashboard';
import CreateTask from './EventFactory/CreateTask/CreateTask';
import GroupCall from './EventFactory/GroupCall/GroupCall';
import Polls from './EventFactory/Polls/Polls';
import SuccessStep from './EventFactory/CreateTask/SuccessStep/SuccessStep';
import Tasks from './EventFactory/Tasks/Tasks';
import YourTasks from './EventFactory/Tasks/YourTasks';
import TaskDetails from './EventFactory/Tasks/TaskDetails';
import TaskSubmit from './EventFactory/Tasks/TaskSubmit';
import TaskFinalise from './EventFactory/Tasks/TaskFinalise';
import Integrations from './ThirdPartyIntegrations/Integrations';
import Contracts from './Contracts/Contracts';
import DaoIntegration from './ThirdPartyIntegrations/DaoIntegration/DaoIntegration';
import DiscordIntegration from './ThirdPartyIntegrations/DiscordIntegration/DiscordIntegration';

const Partners = (props) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

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
          <Route exact path="/partner/integrations-and-contracts" component={Integrations} {...props} />
          <Route exact path="/partner/integrations-and-contracts/dao-integration" component={DaoIntegration} {...props} />
          <Route exact path="/partner/integrations-and-contracts/discord-integration" component={DiscordIntegration} {...props} />
          <Route exact path="/partner/integrations-and-contracts/contracts" component={Contracts} {...props} />

          {/* Partner > Event factory */}
          <Route exact path="/partner/event-factory" component={EventFactory} {...props} />
          <Route path="/partner/event-factory/create-task" component={CreateTask} {...props} />
          <Route path="/partner/event-factory/group-call" component={GroupCall} {...props} />
          <Route path="/partner/event-factory/polls" component={Polls} {...props} />
          <Route path="/partner/event-factory/create-task-success" component={SuccessStep} {...props} />

          {/* Partner > Tasks */}
          <Route exact path="/partner/tasks" component={Tasks} {...props} />
          <Route exact path="/partner/your-tasks" component={YourTasks} {...props} />
          <Route exact path="/partner/tasks/:taskActivityId" component={TaskDetails} {...props} />
          <Route exact path="/partner/tasks/finalise/:taskActivityId" component={TaskFinalise} {...props} />
          <Route path="/partner/tasks/:taskActivityId/submit" component={TaskSubmit} {...props} />

          <Route component={NotFound} />
        </Switch>
      </SidebarDrawer>
    </>
  );
};

export default Partners;
