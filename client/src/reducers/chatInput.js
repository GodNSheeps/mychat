import * as at from '../constants/ActionTypes';

const defaultState = {
    needMentionSearch: false,
    keyword: '',
    mentionableUsers: [],
    mentionedUser: undefined,
    mentions: []
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case at.START_MENTIONING:
            return {
                needMentionSearch: true,
                keyword: action.keyword,
                mentionableUsers: state.mentionableUsers,
                mentionedUser: state.mentionedUser,
                mentions: state.mentions
            };
        case at.RECV_MENTIONABLE_USERS:
            return {
                needMentionSearch: false,
                keyword: action.keyword,
                mentionableUsers: action.payload,
                mentionedUser: state.mentionedUser,
                mentions: state.mentions
            };
        case at.RECV_MENTIONABLE_USERS_NEXT:
            return {
                needMentionSearch: false,
                keyword: action.keyword,
                mentionableUsers:[
                    ...state.mentionableUsers, ...action.payload
                ],
                mentionedUser: state.mentionedUser,
                mentions: state.mentions
            };
        case at.ADD_EFFECTIVE_MENTION:
            return{
                needMentionSearch: state.needMentionSearch,
                keyword: state.keyword,
                mentionableUsers: state.mentionableUsers,
                mentionedUser: state.mentionedUser,
                mentions: [
                    ...state.mentions, "@" + action.mention
                ]
            };
        case at.CLICK_RECOMMANDED_MENTION:
            return {
                needMentionSearch: state.needMentionSearch,
                keyword: state.keyword,
                mentionableUsers: state.mentionableUsers,
                mentionedUser: action.mentionedUser,
                mentions: [ ...state.mentions, "@"+ action.mentionedUser]
            };
        case at.FINISHED_MENTIONING:
            return {
                needMentionSearch: false,
                keyword: '',
                mentionableUsers: [],
                mentionedUser: undefined,
                mentions: state.mentions
            };
        default:
            return state;
    }
};