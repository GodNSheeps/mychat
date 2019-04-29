import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Mentionbar from "../components/Mentionbar";

class MentionWindowContainer extends React.Component {

    render() {
        const {mentions} = this.props;
        console.debug(mentions);
        return (
            <div className="float-right mt-3">
                {_.map(mentions, id => {
                    return (
                        <Mentionbar mention={id}/>
                    )
                })
                }
            </div>
        )
    }
}

export default connect(s => s.mention, d => bindActionCreators({}, d))(MentionWindowContainer);
