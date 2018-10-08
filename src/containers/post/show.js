import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import Spin from "antd/lib/spin";
import Trix from "trix";
import PostCommentForm from "./comment_form";
import { createPostComment } from "../../services/api";
import "./_index.scss";

class PostShowContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            post: null
        }

        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    componentDidMount() {
        fetch("/api/post.show", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.props.match.params.postId })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({ post: json.data, loading: false });
        });
    }

    handleSubmitComment(value) {
        // TODO use real user id
        const params = {
            comment: {
                post_id: this.props.match.params.postId,
                user_id: 1,
                content: value
            }
        };

        createPostComment(params).then(json => {
            // TODO show comment in comment thread
            console.log(json);
        });
    }

    render() {
        const { match } = this.props;
        const { loading, post } = this.state;

        return (
            <div className="container ep-post-container">
                { loading ?
                  <Spin spinning={loading}></Spin> :
                  <PostWithComment {...post} />
                }
                { loading ? <Spin spinning={loading} /> : <PostCommentForm onSubmit={this.handleSubmitComment} />}
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

export default PostShowContainer;
