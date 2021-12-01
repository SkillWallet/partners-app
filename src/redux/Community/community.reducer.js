import { SAVECOMMUNITY } from './community.types';

const INITIAL_STATE = {
    community: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVECOMMUNITY:
            return {
                ...state, community: action.payload,
            };
        default: return state;
    }
}

export default reducer;