import React, { Component } from "react";
import { HashLink } from "react-router-hash-link";
import Moment from "moment";
import ReplyBackwardIcon from "../icons/reply-backward";

class Reply extends Component {
    render() {
        const {reply} = this.props;

        return (
            <div className="post-reply flex my2">
                <div className="mr2">
                    <img
                        alt={reply.creator.name}
                        src={reply.creator.avatar_url}
                        style={{ width: 24, height: 24, borderRadius: 12}}
                    />
                </div>
                <div className="flex-auto">
                    <div className="bold mb1 flex items-center">
                        <div className="flex-auto">{reply.creator.name}</div>
                        <div>
                            <HashLink className="muted h6" to={`#post-${reply.id}`}>
                                <ReplyBackwardIcon />
                            </HashLink>
                        </div>
                        <div className="muted h6 ml2">{Moment(reply.created_at).fromNow()}</div>
                    </div>
                    <div
                        className="trix-content trix-preview flex-auto"
                        dangerouslySetInnerHTML={{__html: reply.content}}
                    />
                </div>
            </div>
        );
    }
};

export default Reply;
