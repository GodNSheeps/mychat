import * as at from '../constants/ActionTypes';

const defaultState = {
    bodies: [],
    scrollId: undefined
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case at.RECV_TEXT:
            return {
                ...state,
                bodies: [
                    ...state.bodies, {
                        messageId: action.payload.id,
                        id: action.payload.username,
                        contents: action.payload.contents,
                    }],
                scrollId: action.payload.id
            };
        case at.CLICK_MENTION:
            return {
                ...state,
                scrollId: action.payload.messageId
            };
        default:
            return state;
    }
};
