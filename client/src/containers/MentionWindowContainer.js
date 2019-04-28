import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {clickMention} from "../actions";
import Mention from "../components/Mention";

class MentionWindowContainer extends React.Component {

    render() {
        const {mentions, clickMention} = this.props;
        const keys = Object.keys(mentions);
        return (
            <div className="float-right mt-3">
                {_.map(keys, id => {
                    return (
                        <Mention clickMention={clickMention} mention={mentions[id]}/>
                    )
                })
                }
            </div>
        )
    }
}

export default connect(s => s.mention, d => bindActionCreators({clickMention}, d))(MentionWindowContainer);
