import { SAVECOMMUNITY } from "./community.types";

export const saveCommunity = (community) => {
    return {
        type: SAVECOMMUNITY,
        payload: community
    };
};