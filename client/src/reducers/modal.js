import * as at from '../constants/ActionTypes';

const defaultState = {
    isNeedShowing: false
}

export default function(state = defaultState, action) {
    switch(action.type) {
        case at.METIONED_MYSELF:
            return {
                isNeedShowing: true
            };
        case at.CLOSE_MODAL:
            return {
                isNeedShowing: false
            };
        default:
            return state;

    }
}