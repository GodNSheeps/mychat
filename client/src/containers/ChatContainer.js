import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import Chat from '../components/Chat';
import {sendText} from '../actions';

class ChatContainer extends React.Component {
    handleSendText(e) {
        e.preventDefault();
        console.log(e.target.text.value);
        this.props.dispatch(sendText("JCooky", e.target.text.value));
    }

    render() {
        return (
            <Chat handleSendText={::this.handleSendText} />
        )
    }
}

function mapToPropsDispatch(dispatch) {
    return {dispatch};
}

export default connect(null, mapToPropsDispatch)(ChatContainer);