import React from 'react';

import {connect} from 'react-redux';

import MyMessage from "../components/MyMessage";
import OtherMessage from "../components/OtherMessage";

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {profile} = this.props;
        const {message} = this.props;
        console.debug(message)
        if (message.id === profile.login)
            return <MyMessage body={message}/>;
        else
            return <OtherMessage body={message}/>;
    }
}

export default connect(s => s.oauth)(MessageContainer);
