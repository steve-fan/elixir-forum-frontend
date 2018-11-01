import React, { Component } from "react";
import { connect } from "react-redux";
import Spin from "antd/lib/spin";
import Navigation from "../../components/nav";
import { Topic } from "../../components/topic";
import PostForm from "../../components/post/form";
import LoginAnchor from "../../components/common/login-anchor";

import {
    fetchTopicAction,
    createTopicPostAction,
    markNotificationAction,
    createPostReplyAction,
} from "../../actions/user-action-creator";

import "./style.scss";

class ShowTopicContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.handleSubmitPost = this.handleSubmitPost.bind(this);
    }

    componentDidUpdate(prevProps) {
        const prevTopicId = prevProps.match.params.topicId;
        const topicId = this.props.match.params.topicId;

        if (topicId != prevTopicId) {
            this.props.fetchTopicAction(topicId);
        }
    }

    componentDidMount() {
        const topicId = this.props.match.params.topicId;
        this.props.fetchTopicAction(topicId);
    }

    render() {
        const { topic, currentUser, notifications } = this.props;

        return (
            <div className="topic-show mb2">
                <Navigation
                    currentUser={currentUser}
                    notifications={notifications}
                    onClickNotification={this.props.markNotificationAction}
                />
                <div className="container ep-post-container">
                    { topic ?
                      <Topic topic={topic} currentUser={currentUser} onSubmitReply={this.props.createPostReplyAction} /> :
                      <Spin spinning={true}></Spin>
                    }
                    { currentUser ? <PostForm onSubmit={this.handleSubmitPost} /> : <LoginAnchor /> }
                </div>
            </div>
        );
    }

    handleSubmitPost(html) {
        const topicId = this.props.match.params.topicId;
        const params = {
            post: {
                content: html,
                topic_id: topicId
            }
        }
        return this.props.createTopicPostAction(params);
    }
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        notifications: state.user.notifications,
        topic: state.topic.currentTopic
    }
}

export default connect(mapStateToProps, {
    fetchTopicAction,
    createTopicPostAction,
    markNotificationAction,
    createPostReplyAction
})(ShowTopicContainer);
