import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import ChatWindow from '../components/ChatWindow';

class ChatWindowContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidUpdate() {
        const {window} = this.props;
        window.current.scrollTo(0, Number.MAX_SAFE_INTEGER);
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
