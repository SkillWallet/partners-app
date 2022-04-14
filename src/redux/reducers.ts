import { combineReducers } from 'redux';
import activityTaskReducer from '@store/Activity/create-task.reducer';
import communityReducer from './Community/community.reducer';
import authSliceReducer from '../auth/auth.reducer';
import uiSliceReducer from './ui-reducer';
import partnerReducer from './Partner/partner.reducer';
import integrateReducer from './Integrate/integrate';
import tasksReducer from './Activity/tasks.reducer';
import activityGroupCallReducer from './Activity/group-call.reducer';

export const reducers = combineReducers({
  community: communityReducer,
  partner: partnerReducer,
  auth: authSliceReducer,
  ui: uiSliceReducer,
  activityTask: activityTaskReducer,
  integrate: integrateReducer,
  tasks: tasksReducer,
  groupCall: activityGroupCallReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return reducers(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
