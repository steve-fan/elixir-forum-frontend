import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import Spin from "antd/lib/spin";
import Trix from "trix";
import Navigation from "../../components/nav";
import PostCommentForm from "./comment_form";
import { fetchTopicAction } from "../../actions/user-action-creator";
import "./style.scss";

class ShowTopicContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
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
                      <Post {...topic} /> :
                      <Spin spinning={true}></Spin>
                    }
                </div>
            </div>
        );
    }
};

const Post = ({title, content}) => (
    <div>
        <div className="h1 pt2 pb2">{title}</div>
        <div className="trix-content trix-preview" dangerouslySetInnerHTML={{__html: content}} />
    </div>
);

const PostComment = ({content}) => (
    <div className="ep-post-comment">
        <header className="ep-comment-header">
            <strong className="comment-name">Steve Fan</strong>
            <span className="comment-timestamp">12:10 pm</span>
        </header>
        <img className="avatar comment-avatar" src="/avatar.png" alt="avatar" />
        <div className="trix-content trix-preview" dangerouslySetInnerHTML={{__html: content}} />
        <div className="comment-actions pt2">
            <span>0 👏</span>
            <span>0 🎉</span>
            <span>0 👎</span>
        </div>
    </div>
);

const PostWithComment = ({title, content, comments}) => {
    const trixDocument = Trix.Document.fromJSON(JSON.parse(content))
    const element = Trix.DocumentView.render(trixDocument);
    return (
        <div>
            <div className="h1 pt2 pb2">{title}</div>
            <div
                className="trix-content trix-preview"
                dangerouslySetInnerHTML={{__html: element.innerHTML}}
            />
            <div className="ep-post-comments">
                { comments.map(c => <PostComment key={c.id} {...c} />)}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        topic: state.topic.currentTopic
    }
}

export default connect(mapStateToProps, {fetchTopicAction})(ShowTopicContainer);
