import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import reducer from './reducers';
import OAuthGithubContainer from "./containers/OAuthGithubContainer";
import Index from "./components";

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={Index} exact={true}/>
                <Route path="/oauth/github/callback" component={OAuthGithubContainer}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
