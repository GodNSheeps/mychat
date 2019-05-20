import React from 'react';
import _ from "lodash";
import ContentContainer from "../containers/ContentContainer"

export default ({body}) => (
    <div style={{width: '100%', display: 'inline-block'}}>
        <div style={{backgroundColor: 'cornflowerblue',
                    display: 'table',
                    color: 'white',
                    float: 'right',
                    marginRight: '0.5rem',
                    padding: '0.5%'}}>
            <ContentContainer contents={body.contents}/>
        </div>
    </div>
)