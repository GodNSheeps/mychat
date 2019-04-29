import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import ChatWindow from '../components/ChatWindow';

class ChatWindowContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.debug("Render chat window");
        const {window} = this.props;
        return (
            <ChatWindow windowRef={window}/>
        );
    }
}

export default connect(s => s.chat)(ChatWindowContainer);
