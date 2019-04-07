import React from 'react';
import {connect} from "react-redux";
import NavbarSignIn from "../components/NavbarSignIn";
import NavbarSigned from "../components/NavbarSigned";
import {getAuthenticated} from '../actions';
import {bindActionCreators} from "redux";

class NavbarOAuthContainer extends React.Component {
    handleSignOut(e) {
        console.debug("Sign Out");
    }

    render() {
        if (!this.props.accessed) {
            return <NavbarSignIn/>;
        } else if (this.props.accessed && this.props.profile === undefined) {
            this.props.getAuthenticated();
            return null;
        } else {
            console.debug(this.props.profile.avatar_url);
            return <NavbarSigned imgSrc={this.props.profile.avatar_url} handleSignOut={::this.handleSignOut} />
        }
    }
}

export default connect(s => s.oauth, d => bindActionCreators({getAuthenticated}, d))(NavbarOAuthContainer);