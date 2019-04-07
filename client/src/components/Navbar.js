import React from 'react';
import NavbarOAuthContainer from '../containers/NavbarOAuthContainer';

export default ({handleSubmit}) => (
    <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">MyChat</a>
        <NavbarOAuthContainer/>
    </nav>
);