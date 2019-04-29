import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {clickMention} from "../actions";
import Mentionbar from "../components/Mentionbar";

class MentionWindowContainer extends React.Component {

    render() {
        const {mentions, clickMention} = this.props;
        console.debug(mentions);
        return (
            <div className="float-right mt-3">
                {_.map(mentions, id => {
                    return <Mentionbar clickMention={clickMention} mention={id}/>;

                })}
            </div>
        )
    }
}

export default connect(s => s.mention, d => bindActionCreators({clickMention}, d))(MentionWindowContainer);
