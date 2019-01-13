import React from 'react';
import Chat from '../components/Chat';

class ChatContainer extends React.Component {
    handleSendText(e) {
        e.preventDefault();
        console.log(e.target.text.value);
    }

    render() {
        return (
            <Chat handleSendText={::this.handleSendText} />
        )
    }
}

export default ChatContainer;