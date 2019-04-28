import * as at from '../constants/ActionTypes';

const defaultState = {
    bodies: [],
    mentionMessages: {}
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case at.RECV_TEXT:
            console.log("--", action);
            return {
                ...state,
                bodies: [
                    ...state.bodies, {
                        messageId: action.payload.id,
                        id: action.payload.username,
                        text: action.payload.text
                    }]
            };
        case at.RECV_MENTION:
            let mentionMessages = {...state.mentions};

            action.payload.forEach(p => {
                mentionMessages[p.messageId] = {
                    mentionId: p.id
                }
            });
            return {
                ...state,
                mentionMessages,
            };
        default:
            return state;
    }
};
