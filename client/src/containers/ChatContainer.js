import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import Chat from '../components/Chat';

class ChatContainer extends React.Component {
    constructor(props){
       super(props);
    }
    render() {
        const {profile} = this.props;

        if (profile) {
            return <Chat />;
        }
        return null;
    }
}

export default connect(s => s.oauth,)(ChatContainer);