import React from 'react';
import Modal from "../components/Modal"
import {closeModal} from "../actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

class ModalContainer extends React.Component{

    handleClickCloseButton(){
        this.props.closeModal();
    }

    render(){
        let opacity = 0;
        let display = "none";
        if(this.props.isNeedShowing){
            opacity = 1;
            display = "block";
        }
        return <Modal opacity={opacity} display={display} handleClickCloseButton = {::this.handleClickCloseButton}/>
    }

}
export default connect(s=> s.modal,d => bindActionCreators({closeModal},d))(ModalContainer)