import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getMentionableUsers, getMentionableUsersNext, clickRecommendedMention, mentionedMyself} from "../actions";

import MentionableUserList from '../components/MentionableUserList';

class MentionableUserListContainer extends React.Component {
    constructor(props){
        super(props);
        this.$mentionableList = React.createRef();
        this.keyword = '';
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {chatInput} = nextProps;
        if(chatInput.needMentionSearch){
            this.keyword = chatInput.keyword;
            this.props.getMentionableUsers(this.keyword);
            return false;
        }
        return true;
    }

    handleScroll(){
        let scrollY = this.$mentionableList.current.scrollTop + this.$mentionableList.current.clientHeight;
        if (scrollY >= this.$mentionableList.current.scrollHeight){
            if (this.$mentionableList.current.childElementCount % 4 == 0){
                this.props.getMentionableUsersNext(this.keyword, this.$mentionableList.current.childElementCount);
            }
        }

    }

    handleItemClick(event) {
        const {profile} = this.props.oauth;
        const {mentionableUsers} = this.props.chatInput;
        var index = event.target.attributes["data-index"].value;
        if(mentionableUsers[index].name === profile.login){
            this.props.mentionedMyself();
        }else{
            this.props.clickRecommendedMention(mentionableUsers[index].name);
        }
    }

    render(){
        const {mentionableUsers} = this.props.chatInput;

        if(mentionableUsers.length > 0){
            return <MentionableUserList users={mentionableUsers}
                                        handleScroll={::this.handleScroll}
                                        mentionableList={this.$mentionableList}
                                        onItemClick={::this.handleItemClick}/>
        }
        else {
            return null;
        }
    }

}

export default connect(s => {return {"oauth": s.oauth, "chatInput": s.chatInput, "modal": s.modal}},
        d => bindActionCreators({getMentionableUsers, getMentionableUsersNext, clickRecommendedMention, mentionedMyself},d))(MentionableUserListContainer);