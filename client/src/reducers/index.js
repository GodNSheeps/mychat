import {combineReducers} from 'redux';
import chat from './chat';
import oauth from './oauth';
import mention from "./mention";

export default combineReducers({chat, oauth, mention});
