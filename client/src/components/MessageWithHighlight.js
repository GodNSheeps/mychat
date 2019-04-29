import React from 'react';

export default ({addRef,uid, id, text}) => (
    <div
        key={uid}
        ref={el => addRef(el)}
        style={{width: '100%', background: 'yellow'}}>{id + " : " + text}</div>
)

