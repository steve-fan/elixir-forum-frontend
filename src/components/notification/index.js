import React, { Component } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import Moment from "moment";
import "./style.scss";


class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link className="notification flex" to={`/t/${this.props.topic.id}/#post-${this.props.post_id}`} onClick={this.props.onClick}>
                <div className="notification-avatar">
                    <img className="avatar rounded" alt={this.props.actor.name} src={this.props.actor.avatar_url} />
                </div>
                <div className="notification-content">
                    <div className="notification-summary">
                        <span className="notification-summary__prefix">讨论了: </span>
                        <span>{this.props.topic.title}</span>
                    </div>
                    <div className="notification-footnote">
                        <span className="notification-footnote__username">{this.props.actor.name}</span>
                        <span className="notification-footnote__timestamp">{Moment(this.props.created_at).fromNow()}</span>
                    </div>
                </div>
                <div className="notification-action mx2 pt1">
                    <div className="unread-indicator"></div>
                </div>
            </Link>
        );
    }
};

export default Notification;
