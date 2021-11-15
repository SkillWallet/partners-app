import { SAVEMEMBERS } from "./members.types";

export const saveMembers = (members) => {
    console.log('called in action?', members);
    return {
        type: SAVEMEMBERS,
        payload: members
    };
};