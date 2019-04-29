import React from 'react';

export default ({name}) => (
    <span style={{
        display: 'table-cell',
        backgroundColor: 'yellow',
        color: 'black',
        padding: '1%',
        marginRight: '2%'
    }}>
        @{name}
    </span>
)
