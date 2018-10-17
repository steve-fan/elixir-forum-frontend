import React, { Component } from "react";
import Moment from "moment";
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import Spin from "antd/lib/spin";
import Trix from "trix";
import Navigation from "../../components/nav";
import { TagLink } from "../../components/tag";
import { Topic } from "../../components/topic";
import { fetchTopicAction, fetchCurrentUser } from "../../actions/user-action-creator";
import "./style.scss";

class ShowTopicContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.fetchCurrentUser()

        const topicId = this.props.match.params.topicId;
        this.props.fetchTopicAction(topicId);
    }

    render() {
        const { topic, currentUser } = this.props;

        return (
            <div className="topic-show">
                <Navigation currentUser={currentUser} />
                <div className="container ep-post-container">
                    { topic ?
                      <Topic {...topic} /> :
                      <Spin spinning={true}></Spin>
                    }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        topic: state.topic.currentTopic
    }
}

export default connect(mapStateToProps, {
    fetchTopicAction,
    fetchCurrentUser
})(ShowTopicContainer);
