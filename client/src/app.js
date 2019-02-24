import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import reducer from './reducers';
import ChatContainer from './containers/ChatContainer';

const store = createStore(reducer);
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={ChatContainer}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
