import React from 'react';
import ChatWindowContainer from "../containers/ChatWindowContainer";
import ChatInputContainer from "../containers/ChatInputContainer";
import MentionableUserListContainer from '../containers/MentionableUserListContainer';

export default () => (
    <div className="container">
        <div className="row">
            <div className="col-1" />
            <div className="col">
                <h1>Chat</h1>
                <ChatWindowContainer />
                <div style={{ height: '0.5rem' }} />
                <ChatInputContainer/>
                <MentionableUserListContainer />
            </div>
            <div className="col-1" />
        </div>
    </div>
);