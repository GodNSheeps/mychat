import React from 'react';
import _ from "lodash";
import ContentContainer from "../containers/ContentContainer"
import {connect} from "react-redux";
import MyMessage from "../components/MyMessage";

class MyMessageContainer extends React.Component {

    constructor(props) {
        super(props);

        this.$window = React.createRef();
    }

    componentDidUpdate() {
        const {scrollId} = this.props;
        const {body} = this.props;
        if (scrollId === body.messageId) {
            this.$window.current.parentNode.scrollTo({
                behavior: 'smooth',
                top: this.$window.current.offsetTop - 29 - this.$window.current.offsetHeight
            });
        }
    }

    componentDidMount() {
        const {scrollId} = this.props;
        const {body} = this.props;
        if (scrollId === body.messageId) {
            this.$window.current.parentNode.scrollTo({
                behavior: 'smooth',
                top: this.$window.current.offsetTop - 29 - this.$window.current.offsetHeight
            });
        }
    }

    render() {
        const {body, ref} = this.props;
        return (
            <div
                key={body.messageId}
                ref={this.$window}
                style={{width: '100%', display: 'inline-block'}}>
                <MyMessage body={body}/>
            </div>
        )
    }
}

export default connect(s => s.chat)(MyMessageContainer);
