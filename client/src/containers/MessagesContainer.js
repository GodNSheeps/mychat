import React from 'react';
import _ from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {readMention} from "../actions";
import MessageContainer from "./MessageContainer";

class MessagesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.itemRefs = {}
    }

    componentDidUpdate() {
        const {windowRef} = this.props
        const {messageId, mentionId} = this.props.mention;
        if (messageId !== undefined) {
            windowRef.current.scrollTo(0, (this.itemRefs[messageId].offsetTop - 37 - this.itemRefs[messageId].offsetHeight));
            this.props.readMention(messageId, mentionId);
        }
    }

    addItemRef(messageId) {
        console.debug(this)
        return (el) => {
            this.itemRefs[messageId] = el;
        }
    }

    render() {
        const {mentionMessages} = this.props.chat;
        return _.map(this.props.chat.bodies, (v) => {
            return <MessageContainer message={v} addItemRef={::this.addItemRef}
                                     isMention={mentionMessages[v.messageId] !== undefined}/>;
        })
    }
}

function mapToPropsState(state) {
    return {chat: state.chat, mention: state.mention}
}

export default connect(mapToPropsState, d => bindActionCreators({readMention}, d))(MessagesContainer);
