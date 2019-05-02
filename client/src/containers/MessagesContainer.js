import React from 'react';
import _ from "lodash";
import {connect} from "react-redux";
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

export default connect(s => s.chat)(MessagesContainer);
