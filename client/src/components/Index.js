import React from 'react';
import JoinChatContainer from "../containers/JoinChatContainer";
import ChatContainer from "../containers/ChatContainer";
import Navbar from "./Navbar";

export default () => (
    <div>
        <Navbar/>
        <JoinChatContainer/>
        <ChatContainer/>
    </div>
);