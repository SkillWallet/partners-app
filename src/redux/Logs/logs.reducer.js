import { SAVELOGS } from './logs.types';

const INITIAL_STATE = {
    logs: null,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVELOGS:
            return {
                ...state, logs: action.payload,
            };
        default: return state;
    }
}

export default reducer;