import React from 'react';
import _ from 'lodash';

export default ({bodies}) => (
    <div className="border border-dark rounded" style={{
        width: '100%',
        height: '20rem',
        paddingLeft: '0.5rem',
        paddingTop: '0.25rem'
    }}>
        {_.map(bodies, (v) => {
            return (
                <div style={{width: '100%'}}>{v.id + " : " + v.text}</div>
            );
        })}
    </div>
);