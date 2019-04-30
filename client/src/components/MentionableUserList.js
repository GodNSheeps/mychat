import React from 'react';
import _ from 'lodash';

export default ({users, handleScroll, mentionableList, onItemClick}) => (
    <div className="list-group"
         style={{
             maxHeight: "10rem",
             overflow: "scroll",
             borderRadius: "0.25rem",
             border: "solid 1px #9f9f9f"}} onScroll={handleScroll} ref={mentionableList}>

        {_.map(users, (user, index) => {
            return (
                <a href='#' key={index} data-index={index} onClick={onItemClick} className="list-group-item">{user.name}</a>
            );
        })}

    </div>
);