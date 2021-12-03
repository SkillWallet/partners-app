import { combineReducers } from "redux";
import membersReducer from './Members/members.reducer';
import communityReducer from './Community/community.reducer';

const rootReducer = combineReducers({
    members: membersReducer,
    community: communityReducer
});

export default rootReducer;