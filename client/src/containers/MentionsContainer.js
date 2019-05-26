import React from 'react';
import Mentionbar from "../components/Mentionbar";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {clickMention} from "../actions";

class MentionsContainer extends React.Component {

  render() {
    const {mentions, clickMention} = this.props;
    return (
        _.map(mentions, (mention, index) => {
          return <Mentionbar clickMention={clickMention} mention={mention} index={index}/>;
        })
    )
  }
}

export default connect(s => s.mention, d => bindActionCreators({clickMention}, d))(MentionsContainer);
