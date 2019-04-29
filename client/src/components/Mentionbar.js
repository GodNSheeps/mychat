import React from 'react';

export default ({mention}) => (
    <div className="alert alert-primary">
        <span className="font-weight-bold">{mention.from}</span> 님이 언급하셨습니다.
    </div>
)
