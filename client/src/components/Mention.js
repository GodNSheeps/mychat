import React from 'react';


export default ({clickMention, mention}) => (
    <div className="alert alert-primary"
         onClick={event => {
             clickMention(mention.messageId, mention.mentionId)
         }}>
        <span className="font-weight-bold">{mention.from}</span> 님이 언급하셨습니다.
    </div>
)
