import React from 'react';

export default ({body}) => (
    <div style={{width: '100%', textAlign: 'right'}}>
        <div style={{backgroundColor: 'cornflowerblue',
                    color: 'white',
                    marginLeft: '20rem',
                    marginRight: '0.5rem',
                    marginBottom: '0.5rem',
                    paddingRight: '1%'}}>
            {body.text}
        </div>
    </div>
)