import React, { Component } from "react";
import Moment from "moment";
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spin from "antd/lib/spin";
import Trix from "trix";
import Tag from "antd/lib/tag";
import Navigation from "../../components/nav";
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

const TagLink = ({name}) => (
    <Link to={`/tags/${name}`}>
        <Tag>{name}</Tag>
    </Link>
)

const Topic = (topic) => (
    <div>
        <div className="h2 pt3 pb1">{topic.title}</div>
        <div className="flex pb2">
            <Link to={`/categories/${topic.category.slug}`}>
                <Tag color={topic.category.background}>{topic.category.name}</Tag>
            </Link>
            { topic.tags.map(tag => <TagLink key={tag.id} {...tag} />) }
        </div>
        <Post {...topic} />
    </div>
);

const Post = ({content, created_at, creator}) => (
    <div className="ep-post-comment">
        <header className="ep-comment-header">
            <strong className="comment-name">Steve Fan</strong>
            <span className="comment-timestamp">{Moment(created_at).fromNow()}</span>
        </header>
        <img className="avatar comment-avatar" src={creator.avatar_url} alt={creator.name} />
        <div className="trix-content trix-preview" dangerouslySetInnerHTML={{__html: content}} />
        <div className="comment-actions pt2">
            <span>0 👏</span>
            <span>0 🎉</span>
            <span>0 👎</span>
        </div>
    </div>
);

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
