import React from 'react';
import ContentContainer from "../containers/ContentContainer";

export default ({body}) => (
    <div style={{width: '100%', display: 'inline-block'}}>
        <span style={{color: 'gray', fontSize: '0.8rem'}}>{body.id}</span>
        <div style={{backgroundColor: 'lightblue',
                    display: 'table',
                    color: 'white',
                    marginRight: '2%',
                    padding: '0.5%'}}>
            <ContentContainer contents={body.contents}/>
        </div>
    </div>
)