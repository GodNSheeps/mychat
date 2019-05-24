import React from 'react';

export default ({opacity, display, handleClickCloseButton}) =>(
    <div style={{opacity: opacity, display:display, background:"rgba(0,0,0,0.4)"}}className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    스스로는 언급할 수 없습니다.
                </div>
                <div style={{paddingBottom: "0.5rem", paddingRight: "0.5rem"}}>
                    <button onClick={handleClickCloseButton} type="button" style={{float:"right"}} className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
);