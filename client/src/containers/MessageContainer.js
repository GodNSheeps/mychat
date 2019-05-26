import React from 'react';

import {connect} from 'react-redux';

import MyMessageContainer from "./MyMessageContainer";
import OtherMessageContainer from "./OtherMessageContainer";

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {profile, message} = this.props;
        if (message.id === profile.login)
            return <MyMessageContainer body={message}/>;
        else
            return <OtherMessageContainer body={message}/>;
    }
}

export default connect(s => s.oauth)(MessageContainer);
