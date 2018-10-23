import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import { HashLink } from "react-router-hash-link";
import Moment from "moment";
import AntIcon from "antd/lib/icon";
import ReplyIcon from "../icons/reply";
import PostReply from "./reply";
import ReplyForwardIcon from "../icons/reply-forword";
import "./style.scss";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPostReply: false
        }

        this.togglePostReply = this.togglePostReply.bind(this);
        this.dismissPostReply = this.dismissPostReply.bind(this);
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
    }


    render() {
        const {content, created_at, creator, id, parent_post_id} = this.props;
        let replyLink;

        if (parent_post_id != undefined) {
            replyLink = (
                <HashLink to={`#post-${parent_post_id}`}>
                    <ReplyForwardIcon className="muted" />
                </HashLink>
            );
        }

        return (
            <div className="ep-post-comment" id={`post-${id}`}>
                <header className="ep-comment-header flex mb1">
                    <div className="bold flex-auto">Steve Fan</div>
                    {replyLink}
                    <div className="comment-timestamp muted ml2 h6">{Moment(created_at).fromNow()}</div>
                </header>
                <img className="avatar comment-avatar" src={creator.avatar_url} alt={creator.name} />
                <div className="trix-content trix-preview" dangerouslySetInnerHTML={{__html: content}} />
                <div className="post-action flex py1 muted">
                    <div className="post-action__thumbup">
                        <AntIcon type="like" />
                        <span className="ml1">赞</span>
                    </div>
                    <div className="post-action__reply ml2" onClick={this.togglePostReply}>
                        <ReplyIcon />
                        <span className="ml1">回复</span>
                    </div>
                </div>
                {
                    this.state.showPostReply ?
                    (<PostReply
                         {...this.props}
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
                this.setState({ showPostReply: false});
            }
        });
    }
};

export default Post;
