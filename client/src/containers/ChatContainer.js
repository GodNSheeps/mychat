import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import Chat from '../components/Chat';
import {sendText} from '../actions';

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.$window = React.createRef();
    }
    handleSendText(e) {
        e.preventDefault();
        const {profile} = this.props;

        this.props.sendText(profile.login, e.target.text.value);
    }

    render() {
        const {profile} = this.props;

        if (profile) {
            return <Chat window={this.$window} name={profile.login} handleSendText={::this.handleSendText} />;
        }
        return null;
    }
}

export default connect(s => s.oauth, d => bindActionCreators({sendText}, d))(ChatContainer);
