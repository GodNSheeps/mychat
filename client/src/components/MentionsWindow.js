import React from 'react';
import MentionsContainer from "../containers/MentionsContainer";

export default () => (
    <div className="float-right mt-3" style={{
        height: '10rem',
        paddingLeft: '0.5rem',
        paddingTop: '0.25rem',
        overflow: 'auto'
    }}>
        <MentionsContainer/>
    </div>
)
