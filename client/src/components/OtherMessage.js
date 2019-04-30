import React from 'react';
import ContentContainer from "../containers/ContentContainer";

export default ({body}) => (
    <div style={{
        backgroundColor: 'lightblue',
        display: 'table',
        color: 'white',
        float: 'left',
        marginRight: '2%',
        padding: '0.5%'
    }}>
        <ContentContainer contents={body.contents}/>
    </div>
)
