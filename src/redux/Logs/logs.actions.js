import { SAVELOGS } from "./logs.types";

export const saveLogs = (logs) => {
    return {
        type: SAVELOGS,
        payload: logs
    };
};