import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import Text from "../components/Text";
import Mention from "../components/Mention";

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {contents} = this.props;
        return _.map(contents, (content) => {
            if (content.user === true) {
                return <Mention name={content.text}/>
            } else {
                return <Text text={content.text}/>
            }
        });

    }
}

function mapToPropsState(state) {
    return state.chat;
}

export default connect(mapToPropsState)(ContentContainer);
