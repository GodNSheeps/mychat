import React from 'react';

export default ({body}) => (
    <div style={{width: '100%'}}>
        {body.id}
        <div style={{backgroundColor: 'lightblue',
                    color: 'white',
                    marginRight: '70%',
                    marginBottom: '1%',
                    paddingLeft: '1%'}}>
            {body.text}
        </div>
    </div>
)