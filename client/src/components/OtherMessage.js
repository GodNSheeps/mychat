import React from 'react';
import ContentContainer from "./MyMessage";

export default ({body, addRef}) => (
    <div
        ref={el => addRef(el)}
        style={{width: '100%', display: 'inline-block'}}>
        {body.id}
        <div style={{backgroundColor: 'lightblue',
                    display: 'table',
                    color: 'white',
                    float: 'left',
                    marginRight: '2%',
                    padding: '0.5%'}}>
            <ContentContainer contents={body.contents}/>
        </div>
    </div>
)
