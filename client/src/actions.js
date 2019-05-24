import axios from 'axios';
import * as at from "./constants/ActionTypes";

class NullSocket {
    send(message){
        console.log(`Warning: send called on NullSocket, dispatch a connect first`);
    }
}

let github = null;
let socket = new NullSocket();
let mychatToken = null;

export function sendText(id, text) {
    return dispatch => {
        return socket.send(JSON.stringify({fromToken: mychatToken, message: text}));
    };
}

export function joinChat() {
    socket = new WebSocket("ws://localhost:8080/chat");
    return dispatch => {
        socket.onmessage = msg => {
            console.log("receive test");
            const payload = JSON.parse(msg.data);
            dispatch({
                type: at.RECV_TEXT,
                payload
            });
        };
    };
}

export function getAccessTokenForGithub(code) {
    return dispatch => {
        axios.get("http://localhost:8080/oauth/github/access-token", {params: {code}})
            .then(t => {
                console.debug("Recive Access token");

                mychatToken = t.data.token;
                dispatch({
                    type: at.RECV_ACCESS_TOKEN,
                    payload: t.data
                });
            })
    }
}

export function getAuthenticated() {
    return dispatch => {
        github.users.getAuthenticated({})
            .then(result => {
                dispatch({
                    type: at.RECV_USER_INFO,
                    payload: result.data
                });
            });
    }
}

export function setGithub(gh) {
    github = gh;
    console.debug(github);
}

export function getGithub() {
    return github;
}

export function startMentioning(keyword){
    return dispatch => {
        dispatch({
            type: at.START_MENTIONING,
            keyword: keyword
        });
    }
}

export function getMentionableUsers(keyword){
    return dispatch => {
        axios.get("http://localhost:8080/mention/users",{
            params:{
                keyword: keyword,
                page: 0
            }
        }).then(response => {
            dispatch({
                type: at.RECV_MENTIONABLE_USERS,
                payload: response.data,
                keyword: ''
            })
        })
    }
}

export function getMentionableUsersNext(keyword, itemNum){
    if (itemNum % 4 != 0){
        return;
    }
    return dispatch => {
        axios.get("http://localhost:8080/mention/users", {
            params:{
                keyword: keyword,
                page:itemNum/4
            }
        }).then(response => {
            dispatch({
                type: at.RECV_MENTIONABLE_USERS_NEXT,
                payload: response.data,
                keyword: ''
            })
        })
    }
}

export function checkMentionEffectvie(mention) {
    return dispatch => {
        axios.post("http://localhost:8080/mention/check", {
            keyword: mention
        }).then(response => {
            var isEffective = response.data.iseffective;
            if (isEffective) {
                dispatch({
                    type: at.ADD_EFFECTIVE_MENTION,
                    mention: mention
                });
            }

        })
    }
}

export function finishMentioning(){
    return dispatch => { dispatch({ type: at.FINISHED_MENTIONING }) }
}

export function clickRecommendedMention(userName){
    return dispatch => {
        dispatch ({
            type: at.CLICK_RECOMMANDED_MENTION,
            mentionedUser: userName
        });
    }
}

export function mentionedMyself(){
    return dispatch => { dispatch({ type: at.METIONED_MYSELF }) }
}

export function closeModal(){
    return dispatch => { dispatch({ type: at.CLOSE_MODAL })}
}
