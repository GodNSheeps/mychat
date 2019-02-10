import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {setGithub, getAccessTokenForGithub} from "../actions";
import Octokit from '@octokit/rest';
import {Redirect} from "react-router";

class OAuthGithubContainer extends React.Component {
    render() {
        console.debug("Render for oauth of github");

        if (!this.props.accessed) {
            const params = new URL(window.location).searchParams;
            this.props.getAccessTokenForGithub(params.get("code"));
            return null;
        } else {
            setGithub(new Octokit({
                auth: 'token ' + this.props.payload.access_token
            }));
            return <Redirect to="/" />;
        }
    }
}

export default connect(s => s.oauth, d => bindActionCreators({getAccessTokenForGithub}, d))(OAuthGithubContainer);