import axios from 'axios';
import * as at from "./constants/ActionTypes";

class NullSocket {
    send(message) {
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
                console.debug(mychatToken);
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

export function getMentions() {
    return dispatch => {
        axios.get("http://localhost:8080/mentions", {params: {token: mychatToken}})
            .then(result => {
                console.debug(result.data)
                dispatch({
                    type: at.RECV_MENTION,
                    payload: result.data
                })
            })
    }
}

export function clickMention(messageId, mentionId) {
    return dispatch => dispatch({
        type: at.CLICK_MENTION,
        payload: {messageId, mentionId}
    })
}

export function readMention(messageId, mentionId) {
    return dispatch => {
        axios.put("http://localhost:8080/mentions", {token: mychatToken, mentionId})
            .then(result => {
                dispatch({
                    type: at.READ_MENTION,
                    payload: {messageId: messageId, mentionId: mentionId}
                })
            })

    }
}

export function setGithub(gh) {
    github = gh;
    console.debug(github);
}

export function getGithub() {
    return github;
}
