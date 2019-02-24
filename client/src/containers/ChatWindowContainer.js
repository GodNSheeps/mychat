import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import ChatWindow from '../components/ChatWindow';

class ChatWindowContainer extends React.Component {
    render() {
        return (
            <ChatWindow bodies={this.props.bodies} />
        );
    }
}

function mapToPropsState(state) {
    return state.chat;
}

export default connect(mapToPropsState)(ChatWindowContainer);