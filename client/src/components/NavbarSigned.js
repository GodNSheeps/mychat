import React from 'react';

export default ({imgSrc, handleSignOut}) => (
    <button className="btn btn-outline-default" role="button" onClick={handleSignOut} style={{padding: 0}}>
        <img style={{
            width: "45px",
            borderRadius: "0.5rem"
        }} src={imgSrc} />
        Sign Out
    </button>
);