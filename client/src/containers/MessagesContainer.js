import React from 'react';
import _ from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {readMention} from "../actions";
import MessageContainer from "./MessageContainer";

class MessagesContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return _.map(this.props.bodies, (v) => {
            return <MessageContainer message={v}/>;
        })
    }
}

export default connect(s => s.chat, d => bindActionCreators({readMention}, d))(MessagesContainer);
