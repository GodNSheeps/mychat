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
                    text: action.payload.text,
                }]
            };
        default:
            return state;
    }
};