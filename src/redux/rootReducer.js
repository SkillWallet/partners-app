import { combineReducers } from "redux";
import membersReducer from './Members/members.reducer';
import communityReducer from './Community/community.reducer';
import logsReducer from './Logs/logs.reducer';

const rootReducer = combineReducers({
    members: membersReducer,
    community: communityReducer,
    logs: logsReducer
});

export default rootReducer;