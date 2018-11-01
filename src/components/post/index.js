import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import { HashLink } from "react-router-hash-link";
import Moment from "moment";
import AntIcon from "antd/lib/icon";
import CommentIcon from "../icons/comment";
import Reply from "./reply";
import ReplyForm from "./reply-form";
import ReplyForwardIcon from "../icons/reply-forward";
import "./style.scss";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPostReply: false,
            showReplies: false,
            freshReplies: []
        }

        this.togglePostReply = this.togglePostReply.bind(this);
        this.dismissPostReply = this.dismissPostReply.bind(this);
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
        this.toggleReplies = this.toggleReplies.bind(this);
    }


    render() {
        const {content, created_at, creator, id, parent_post, replies} = this.props.post;
        const { currentUser } = this.props;

        let replyLink, repliesToggleElement, repliesElement, freshRepliesElement;

        if (parent_post) {
            replyLink = (
                <HashLink className="flex items-center" to={`#post-${parent_post.id}`}>
                    <ReplyForwardIcon className="muted" />
                    <div className="ml1">
                        <img
                            alt={parent_post.creator.name}
                            src={parent_post.creator.avatar_url}
                            style={{width: 18, height: 18, borderRadius: 9, marginRight: 4}}
                        />
                    </div>
                    <div>{parent_post.creator.name}</div>
                </HashLink>
            );
        }

        if (replies.length > 0) {
            repliesToggleElement = (
                <div className="cursor-pointer" onClick={this.toggleReplies}>
                    <span>{replies.length}</span>
                    <span> 条评论</span>
                    <AntIcon type={this.state.showReplies ? "up" : "down"} theme="outlined" />
                </div>
            );
        }

        if (this.state.showReplies) {
            repliesElement = (
                <div className="post-replies">
                    { replies.map( reply => <Reply key={reply.id} reply={reply} />)}
                </div>
            );
        }

        freshRepliesElement = (
            <div className="post-fresh-replies">
                { this.state.freshReplies.map( reply => <Reply key={reply.id} reply={reply} />)}
            </div>
        )

        return (
            <div className="ep-post-comment" id={`post-${id}`}>
                <header className="ep-comment-header flex items-center mb1">
                    <div className="bold flex-auto">Steve Fan</div>
                    {replyLink}
                    <div className="comment-timestamp muted ml2 h6">{Moment(created_at).fromNow()}</div>
                </header>
                <img className="avatar comment-avatar" src={creator.avatar_url} alt={creator.name} />
                <div className="trix-content trix-preview" dangerouslySetInnerHTML={{__html: content}} />
                <div className="post-action flex py1 muted">
                    <div className="post-action__replies flex-auto">
                        { repliesToggleElement }
                    </div>
                    <div className="post-action__thumbup">
                        <AntIcon type="like" />
                        <span className="ml1">赞</span>
                    </div>
                    <div className="post-action__reply ml2" onClick={this.togglePostReply}>
                        <CommentIcon />
                        <span className="ml1">评论</span>
                    </div>
                </div>
                {repliesElement}
                {repliesElement ? null : freshRepliesElement}
                {
                    (currentUser && this.state.showPostReply) ?
                    (<ReplyForm
                         post={this.props.post}
                         onSubmit={this.handleSubmitReply}
                         onCancel={this.dismissPostReply}
                    />) :
                    null
                }
            </div>
        );
    }

    togglePostReply() {
        this.setState({ showPostReply: !this.state.showPostReply });
    }

    dismissPostReply() {
        this.setState({ showPostReply: false })
    }

    handleSubmitReply(params) {
        this.props.onSubmitReply(params).then(json => {
            if (json.success) {
                this.setState({
                    showPostReply: false,
                    freshReplies: [...this.state.freshReplies, json.data]
                });
            }
        });
    }

    toggleReplies() {
        this.setState({ showReplies: !this.state.showReplies});
    }
};

export default Post;
