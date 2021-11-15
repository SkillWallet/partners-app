import { combineReducers } from "redux";
import counterReducer from './Counter/counter.reducer';
import membersReducer from './Members/members.reducer';
import communityReducer from './Community/community.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    members: membersReducer,
    community: communityReducer
});

export default rootReducer;