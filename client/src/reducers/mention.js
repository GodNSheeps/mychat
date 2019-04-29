import * as at from '../constants/ActionTypes';

const defaultState = {
    mentions: [],
    index: undefined
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case at.RECV_TEXT:
            let i = 0;
            return {
                ...state,
                mentions: [
                    ...state.mentions,
                    ..._.filter(action.payload.contents, content => {
                        return content.user;
                    }).map(content => {
                        return {
                            index: i++,
                            from: action.payload.username,
                            messageId: action.payload.id
                        }
                    })
                ]
            };
        case at.CLICK_MENTION:
            let mentions = [...state.mentions];
            mentions.splice(action.payload.index, 1);
            return {
                ...state,
                mentions
            };
        default:
            return state;
    }
};
