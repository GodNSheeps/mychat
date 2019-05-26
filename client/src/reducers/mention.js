import * as at from '../constants/ActionTypes';

const defaultState = {
    mentions: []
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case at.RECV_TEXT:
            const newMentions = _.filter(action.payload.contents, (content) => {
                return content.user;
            }).map((content) => {
                return {
                    from: action.payload.username,
                    messageId: action.payload.id
                }
            });
            return {
                ...state,
                mentions: [
                    ...state.mentions,
                    ...newMentions
                ]
            };
        case at.CLICK_MENTION:
            let mentions = [...state.mentions];
            let index = action.payload.index;
            mentions.splice(index, 1);
            return {
                ...state,
                mentions
            };
        default:
            return state;
    }
};
