import React from 'react';

export default ({clickMention, mention, index}) => (
    <div className="alert alert-primary"
         onClick={event => {
             console.debug(clickMention)
             clickMention(mention.messageId, index)
         }}>
        <span className="font-weight-bold">{mention.from}</span> 님이 언급하셨습니다.
    </div>
)
