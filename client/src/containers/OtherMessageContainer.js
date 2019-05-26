import React from 'react';
import _ from "lodash";
import {connect} from "react-redux";
import OtherMessage from "../components/OtherMessage";

class OtherMessageContainer extends React.Component {

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
        const {body} = this.props;
        return (
            <div
                ref={this.$window}
                style={{width: '100%', display: 'inline-block'}}>
                {body.id}
                <OtherMessage body={body}/>
            </div>
        )
    }
}

export default connect(s => s.chat)(OtherMessageContainer);

