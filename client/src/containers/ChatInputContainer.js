import $ from 'jquery';
import React from 'react';
import {sendText, checkMentionEffectvie, startMentioning, finishMentioning, mentionedMyself} from '../actions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from "lodash";

import ChatInput from "../components/ChatInput";
import {ChatInputRules, ChatInputRulesCommand} from "./ChatInputRules";

const getComponentType = (term) => ({
    mention: "<span style='background: #EAF5F9; color: #2E7CF6'>" + term + "</span>",
    plainText: term,
    caretSpan: '<span id=' + caretPosition + '></span>'
});
const caretPosition = 'caretPosition';

const IS_NEW_MENTION = "IS_NEW_MENTION";
const IS_FIRST_MENTION = "IS_FIRST_MENTION";
const IS_FOCUSED = "IS_FOCUSED";
const MENTION_REGEX = /^@/;

class ChatInputContainer extends React.Component {

    constructor(props){
        super(props);
        this.$inputElem = React.createRef();
        this.prevInputString = '';
        this.mentionStartIndex = -1;
        this.needHighlighting = false;
        this.terms = [];
        this.prevTerms = [];

        this.chatInputRules = new ChatInputRules();
        this.chatInputRules.addRule(IS_NEW_MENTION, function (params){
            return !params["prevTerms"].includes(params["term"])
                && params['regex'].exec(params["term"]) != null
        }).addRule(IS_FOCUSED, function(params){
            return params['mentionStartIndex'] === params['termIndex'];
        }).addRule(IS_FIRST_MENTION, function(params) { return params["mentionStartIndex"] < 0 });
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

            let params = {'prevTerms': this.prevTerms,
                'term': term, 'regex': MENTION_REGEX, 'mentionStartIndex': this.mentionStartIndex, 'termIndex':index};

            let startMentioningCommand = new ChatInputRulesCommand(this.props.startMentioning, term.substring(1, term.length));
            let saveMentionStartIndex = new ChatInputRulesCommand((i) => {this.mentionStartIndex = i}, index);

            this.chatInputRules.run(params).when(IS_NEW_MENTION).or(IS_FOCUSED).then(startMentioningCommand);
            this.chatInputRules.run(params).when(IS_FIRST_MENTION).require(IS_NEW_MENTION).then(saveMentionStartIndex);

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
        let isMentionedMyself = false;
        _.map(this.terms, (term, index) => {
            if(term.substring(1,term.length) === this.props.oauth.profile.login){
                this.props.mentionedMyself();
                isMentionedMyself = true;
            }
            else if(chatInput.mentions.includes(term)){
                var mentionSpan = $(getComponentType(term)['mention']);
                $(this.$inputElem.current).append(mentionSpan);
            } else if(term.length === 0 && index < this.terms.length - 1){
                $(this.$inputElem.current).append(" ");
            } else {
                $(this.$inputElem.current).append(getComponentType(term)["plainText"]);
            }

            if((term.length !== 0 || index !== this.terms.length -1) && !isMentionedMyself){
                $(this.$inputElem.current).append(" ");
            }else {
                isMentionedMyself = false;
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
        d => bindActionCreators({sendText, checkMentionEffectvie, startMentioning, finishMentioning, mentionedMyself},d))(ChatInputContainer);