import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import AntIcon from "antd/lib/icon";
import Moment from "moment";
import "./style.scss";

class TopicContent extends Component {
    render() {
        const {content, created_at, posts_count, likes_count, views_count, creator, id} = this.props;

        return (
            <div className="ep-post-comment" id={`post-${id}`}>
                <header className="ep-comment-header flex mb1">
                    <div className="bold flex-auto">Steve Fan</div>
                    <div className="comment-timestamp muted h6">{Moment(created_at).fromNow()}</div>
                </header>
                <img className="avatar comment-avatar" src={creator.avatar_url} alt={creator.name} />
                <div className="trix-content trix-preview" dangerouslySetInnerHTML={{__html: content}} />
                <div className="topic-content__statistics flex py1 muted">
                    <div className="topic-content__thumbup_count flex items-center">
                        <AntIcon type="like" />
                        <span className="ml1">{likes_count}</span>
                        <span> 赞</span>
                    </div>
                    <div className="topic-content__posts_count ml2 flex items-center">
                        <AntIcon type="message" />
                        <span className="ml1">{posts_count}</span>
                        <span> 条评论</span>
                    </div>
                    <div className="topic-content_views_count ml2 flex items-center">
                        <AntIcon type="eye" />
                        <span className="ml1">{views_count}</span>
                        <span>浏览</span>
                    </div>
                </div>
            </div>
        );
    }
};

export default TopicContent;
