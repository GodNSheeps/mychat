import React from 'react';
import {connect} from "react-redux";
import MessageWithHighlight from "../components/MessageWithHighlight";
import Message from "../components/Message";

class MessageContainer extends React.Component {


    render() {
        const {addItemRef, message, isMention} = this.props;
        if (isMention) {
            return <MessageWithHighlight key={message.messageId} uid={message.messageId}
                                         addRef={addItemRef(message.messageId)}
                                         id={message.id}
                                         text={message.text}/>;
        } else {
            return <Message key={message.messageId} uid={message.messageId} addRef={addItemRef(message.messageId)}
                            id={message.id} text={message.text}/>;
        }
    }
}

export default connect()(MessageContainer);
