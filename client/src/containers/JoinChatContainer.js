import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {getMentions, joinChat} from '../actions';

class JoinChatContainer extends React.Component {
    render() {
        console.debug("Join Chat");
        const {profile} = this.props;
        if (profile) {
            this.props.joinChat();
            this.props.getMentions();
        }
        return null;
    }
}

export default connect(s => s.oauth, d => bindActionCreators({joinChat, getMentions}, d))(JoinChatContainer);
