import { SAVEMEMBERS } from './members.types';

const INITIAL_STATE = {
    members: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVEMEMBERS:
            console.log('called in reducer?', action);
            return {
                ...state, members: action.payload,
            };
        default: return state;
    }
}

export default reducer;