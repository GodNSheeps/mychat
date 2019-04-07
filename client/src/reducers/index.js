import {combineReducers} from 'redux';
import chat from './chat';
import oauth from './oauth';

export default combineReducers({chat, oauth});
