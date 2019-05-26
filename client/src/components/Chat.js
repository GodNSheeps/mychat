import React from 'react';
import ChatWindowContainer from "../containers/ChatWindowContainer";
import MentionsWindow from "./MentionsWindow";

export default ({name, handleSendText}) => (
    <div className="container">
        <div className="row">
            <div className="col-1" />
            <div className="col">
                <h1>Chat</h1>
                <ChatWindowContainer />
                <div style={{ height: '0.5rem' }} />
                <form action="#" onSubmit={handleSendText}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">{name}</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Put text for the chat" name="text" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
                <MentionsWindow />
            </div>
            <div className="col-1" />
        </div>
    </div>
);
