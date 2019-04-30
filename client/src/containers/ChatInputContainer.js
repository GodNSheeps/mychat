import $ from 'jquery';
import React from 'react';
import {sendText, checkMentionEffectvie, startMentioning, finishMentioning} from '../actions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from "lodash";

import ChatInput from "../components/ChatInput";

const getComponentType = (term) => ({
    mention: "<span style='background: #EAF5F9; color: #2E7CF6'>" + term + "</span>",
    plainText: term,
    caretSpan: '<span id=' + caretPosition + '></span>'
});
const caretPosition = 'caretPosition';

class ChatInputContainer extends React.Component {

    constructor(props){
        super(props);
        this.$inputElem = React.createRef();
        this.$caretPosition = React.createRef();
        this.prevInputString = '';
        this.mentionStartIndex = -1;
        this.needHighlighting = false;
        this.terms = [];
        this.prevTerms = [];
    }

    handleSendText(e) {
        e.preventDefault();
        const {profile} = this.props.oauth;
        this.props.sendText(profile.login, this.$inputElem.current.innerText);
        $(this.$inputElem.current).empty();
    }

    handleKeyUp(ev){
        this.removeStrangeFontTag();
        let string = this.$inputElem.current.innerText;
        if (string === this.prevInputString){
            return;
        } else if (string.length === 0){
            this.mentionStartIndex = -1;
            this.props.finishMentioning();
        }
        this.terms = string.split(' ');
        _.map(this.terms, (term, index) => {
            if(term.startsWith('@') && !this.props.chatInput.mentions.includes(term)){
                this.props.checkMentionEffectvie(term.substring(1, term.length));
            }

            if(!this.prevTerms.includes(term) && term.startsWith('@') && this.mentionStartIndex < 0 ){
                this.props.startMentioning(term.substring(1, term.length));
                this.mentionStartIndex = index;
            } else if(!this.prevTerms.includes(term) && term.startsWith('@') || this.mentionStartIndex === index){
                this.props.startMentioning(term.substring(1, term.length));
            }

            if(ev.key === ' ' && this.mentionStartIndex >= 0) {
                this.props.finishMentioning();
                this.needHighlighting = true;
            }

            if(this.terms.length - 1 === index && this.needHighlighting){
                this.highlighting();
            }
        });
        this.prevTerms = this.terms;
        this.prevInputString = string;
    }

    highlighting(){
        $(this.$inputElem.current).empty();
        const {chatInput} = this.props;
        this.needHighlighting = false;
        _.map(this.terms, (term, index) => {
            if(chatInput.mentions.includes(term)){
                var mentionSpan = $(getComponentType(term)['mention']);
                $(this.$inputElem.current).append(mentionSpan);
            } else if(term.length === 0 && index < this.terms.length - 1){
                $(this.$inputElem.current).append(" ");
            } else {
                $(this.$inputElem.current).append(getComponentType(term)["plainText"]);
            }
            if(term.length !== 0 || index !== this.terms.length -1){
                $(this.$inputElem.current).append(" ");
            }
            if(this.mentionStartIndex === index){
                this.mentionStartIndex = -1;
                $(this.$inputElem.current).append(getComponentType()['caretSpan']);
            }
        });
    }

    removeStrangeFontTag(){
        let font = $('font')[0];
        if(font == undefined){
            return;
        }
        $(this.$inputElem.current).append(getComponentType()['caretSpan']);
        font.replaceWith(font.textContent);
        this.setCaretPosition();

    }

    setCaretPosition(){
        var range = document.createRange();
        var caretSpan = $("#"+caretPosition)[0];
        if(caretSpan == undefined){
            return;
        }
        range.selectNode(caretSpan);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        range.deleteContents();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.chatInput.mentionedUser == undefined){
            this.setCaretPosition();
            return;
        }
        this.terms[this.mentionStartIndex] = "@" + this.props.chatInput.mentionedUser;
        this.props.finishMentioning();
        this.highlighting();
        this.setCaretPosition();
    }

    render() {
        const {profile} = this.props.oauth;
        return <ChatInput
            handleSendText={::this.handleSendText}
            name={profile.login}
            handleKeyUp={::this.handleKeyUp}
            inputElem={this.$inputElem}/>
    }

}

export default connect(s => {return {"oauth": s.oauth,"chatInput": s.chatInput}},
        d => bindActionCreators({sendText, checkMentionEffectvie, startMentioning, finishMentioning},d))(ChatInputContainer);