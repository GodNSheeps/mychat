import * as at from '../constants/ActionTypes';

const defaultState = {
    bodies: []
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case at.RECV_TEXT:
            return {
                bodies: [
                    ...state.bodies, {
                    id: action.payload.username,
                    contents: action.payload.contents,
                }]
            };
        default:
            return state;
    }
};