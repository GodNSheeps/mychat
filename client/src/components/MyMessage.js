import React from 'react';

export default ({body}) => (
    <div style={{width: '100%', textAlign: 'right'}}>
        <div style={{backgroundColor: 'cornflowerblue',
                    color: 'white',
                    marginLeft: '70%',
                    marginRight: '2%',
                    marginBottom: '1%',
                    paddingRight: '1%'}}>
            {body.text}
        </div>
    </div>
)