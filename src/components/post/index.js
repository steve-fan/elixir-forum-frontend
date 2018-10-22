import React, { Component } from "react";
import Moment from "moment";

const Post = ({content, created_at, creator, id}) => (
    <div className="ep-post-comment" id={`post-${id}`}>
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

export default Post;
