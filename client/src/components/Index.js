import React from 'react';
import JoinChatContainer from "../containers/JoinChatContainer";
import ChatContainer from "../containers/ChatContainer";
import Navbar from "./Navbar";
import ModalContainer from '../containers/ModalContainer';


export default () => (
    <div>
        <Navbar/>
        <JoinChatContainer/>
        <ChatContainer/>
        <ModalContainer/>
    </div>
);