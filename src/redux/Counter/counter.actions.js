import { INCREMENT, DECREMENT } from "./counter.types";

export const increaseCounter = (newState) => {
    return {
        type: INCREMENT,
        payload: newState
    };
};

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    };
};