import React from 'react';

export default ({name}) => (
    <span style={{
        display: 'table-cell',
        backgroundColor: 'yellow',
        color: 'black',
        padding: '0.25rem',
        marginRight: '0.5rem'}}>
        @{name}
    </span>
)