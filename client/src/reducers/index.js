import {combineReducers} from 'redux';
import chat from './chat';
import oauth from './oauth';
import chatInput from './chatInput';
import modal from './modal'

export default combineReducers({chat, oauth, chatInput, modal});
