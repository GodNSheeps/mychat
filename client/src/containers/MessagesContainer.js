import React from 'react';
import _ from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {readMention} from "../actions";
import MessageContainer from "./MessageContainer";

class MessagesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.itemRefs = {}
    }

    componentDidUpdate() {
        const {windowRef, scrollId} = this.props
        if (scrollId !== undefined) {
            windowRef.current.scrollTo(0, this.itemRefs[scrollId].offsetTop - 37 - this.itemRefs[scrollId].offsetHeight);
            this.props.readMention(scrollId);
        }
    }

    addItemRef(messageId) {
        console.debug(this)
        return (el) => {
            this.itemRefs[messageId] = el;
        }
    }

    render() {
        return _.map(this.props.bodies, (v) => {

            return <MessageContainer message={v} addItemRef={::this.addItemRef}/>;
        })
    }
}

export default connect(s => s.chat, d => bindActionCreators({readMention}, d))(MessagesContainer);
