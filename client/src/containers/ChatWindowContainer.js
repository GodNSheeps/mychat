import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import ChatWindow from '../components/ChatWindow';

class ChatWindowContainer extends React.Component {
    constructor(props) {
        super(props);
        this.$window = React.createRef();
    }

    componentDidUpdate() {
        this.$window.current.scrollTo(0, Number.MAX_SAFE_INTEGER);
    }

    render() {
        return (
            <ChatWindow windowRef={this.$window} bodies={this.props.chat.bodies} />
        );
    }
}

function mapToPropsState({chat, oauth}) {
    return {chat, oauth};
}

export default connect(mapToPropsState)(ChatWindowContainer);