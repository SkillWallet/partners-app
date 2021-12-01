import { SAVEMEMBERS, AUTHUSER } from "./members.types";

export const saveMembers = (members) => {
    return {
        type: SAVEMEMBERS,
        payload: members
    };
};

export const isUserAuthenticated = (auth) => {
    return {
        type: AUTHUSER,
        payload: auth
    };
};