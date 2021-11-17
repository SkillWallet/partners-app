import { SAVEMEMBERS, AUTHUSER } from './members.types';

const INITIAL_STATE = {
    members: null,
    auth: false
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVEMEMBERS:
            return {
                ...state, members: action.payload,
            };
        case AUTHUSER:
            return {
                ...state, auth: action.payload
            }
        default: return state;
    }
}

export default reducer;