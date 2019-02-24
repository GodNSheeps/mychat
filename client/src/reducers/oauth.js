import * as at from '../constants/ActionTypes';
import {RECV_ACCESS_TOKEN} from "../constants/ActionTypes";

const defaultState = {
    accessed: false,
    profile: undefined
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case at.RECV_ACCESS_TOKEN:
            console.log("action type: " + RECV_ACCESS_TOKEN);
            console.log(action);
            return {
                accessed: true,
                payload: action.payload,
                profile: undefined
            };
        case at.RECV_USER_INFO:
            return {
                accessed: state.accessed,
                profile: action.payload
            };
        default:
            return state;
    }
};