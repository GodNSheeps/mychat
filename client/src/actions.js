import * as at from "./constants/ActionTypes";

export function sendText(id, text) {
    return {
        type: at.SEND_TEXT,
        payload: { id, text }
    };
}