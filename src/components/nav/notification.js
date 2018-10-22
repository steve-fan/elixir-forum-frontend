import React, { Component } from "react";
import { Popover } from "@blueprintjs/core";
import Notification from "../notification";
import Badge from "antd/lib/badge";

class NotificationPopover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.togglePopover = this.togglePopover.bind(this);
        this.handleClickNotification = this.handleClickNotification.bind(this);
    }

    render() {
        const {items} = this.props;

        return (
            <Popover isOpen={this.state.isOpen}>
                <Badge
                    count={items.length}
                    offset={[8, 0]}
                    onClick={this.togglePopover}
                    style={{background: "#FF6E4A"}}
                >
                    <span>通知</span>
                </Badge>
                <div className="notifications">
                    {items.map(item => <Notification key={item.id} {...item} onClick={this.handleClickNotification(item.id)} />)}
                </div>
            </Popover>
        );
    }

    togglePopover() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleClickNotification(notificationId) {
        return () => {
            this.props.onClickItem(notificationId);
            this.setState({ isOpen: false});
        }
    }
};

export default NotificationPopover;
