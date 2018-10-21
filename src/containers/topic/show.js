import React, { Component } from "react";
import { connect } from "react-redux";
import Spin from "antd/lib/spin";
import Navigation from "../../components/nav";
import { Topic } from "../../components/topic";
import PostForm from "../../components/post/form";

import {
    fetchTopicAction,
    createTopicPostAction,
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
            <div className="topic-show">
                <Navigation currentUser={currentUser} notifications={notifications} />
                <div className="container ep-post-container">
                    { topic ?
                      <Topic {...topic} /> :
                      <Spin spinning={true}></Spin>
                    }
                    <PostForm onSubmit={this.handleSubmitPost} />
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
    createTopicPostAction
})(ShowTopicContainer);
