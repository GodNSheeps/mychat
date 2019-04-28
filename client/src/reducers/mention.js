
import * as at from '../constants/ActionTypes';

const defaultState = {
    mentions: {},
    messageId: undefined,
    mentionId: undefined
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case at.RECV_MENTION:
            console.debug("recv mention", action.payload)
            let mentions = {...state.mentions};
            action.payload.forEach(p => {
                mentions[p.messageId] = {
                    mentionId: p.id,
                    from: p.from,
                    messageId: p.messageId,
                    user: p.userId
                }
            });
            return {
                ...state,
                mentions,
            };
        case at.CLICK_MENTION:
            return {
                ...state,
                mentionId: action.payload.mentionId,
                messageId: action.payload.messageId
            };
        case at.READ_MENTION:
            mentions = {...state.mentions};
            delete mentions[action.payload.messageId];
            return {
                ...state,
                messageId: undefined,
                mentions
            }
        default:
            return state;
    }
};
