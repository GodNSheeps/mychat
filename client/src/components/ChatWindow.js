import React from 'react';
import _ from 'lodash';
import MessagesContainer from "../containers/MessagesContainer";

export default () => (
    <div className="border border-dark rounded" style={{
        width: '100%',
        height: '20rem',
        paddingLeft: '0.5rem',
        paddingTop: '0.25rem',
        overflow: 'auto'
    }}>
        <MessagesContainer/>
    </div>
);
