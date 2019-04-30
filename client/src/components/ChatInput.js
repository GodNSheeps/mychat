import React from 'react';


export default ({handleSendText, name, handleKeyUp, inputElem}) => (
    <form action="#" onSubmit={handleSendText}>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">{name}</span>
            </div>
            <p style={{height: "auto", maxHeight: "5rem", overflow: "hidden", whiteSpace:"pre"}}
               className="form-control"
               ref={inputElem}
               onKeyUp={handleKeyUp}
               contentEditable={true}/>
            <div className="input-group-append">
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </div>
    </form>
);