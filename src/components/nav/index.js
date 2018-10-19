import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Badge from "antd/lib/badge";
import Menu, { Item as MenuItem } from "antd/lib/menu";
import { Icon, Menu as BPMenu, Position } from "@blueprintjs/core";
import { MenuItem as BPMenuItem } from "@blueprintjs/core";
import { Popover} from "@blueprintjs/core";
import { UserAvatar} from "../../components/avatar";

const NavbarAvatar = (props) => {
    const menu = (
        <BPMenu>
            <BPMenuItem icon="log-out" href="/auth/logout" text="登出" />
        </BPMenu>
    );

    return (
        <Popover content={menu}>
            <UserAvatar {...props} />
        </Popover>
    );
}

class Navigation extends Component {
    render() {
        const { currentUser, notifications } = this.props;
        const notificationCount = notifications ? notifications.data.length : 0;

        return (
            <header className="clearfix top-nav">
                <div className="container">
                    <Row type="flex">
                        <Col span={4}>
                            <Menu mode="horizontal" style={{marginLeft: -20}}>
                                <MenuItem>
                                    <Link to="/" className="logo">
                                        <strong>ElixirWay</strong>
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Col>
                        <Col span="20">
                            <Menu mode="horizontal" className="right-menu">
                                <MenuItem className="menu-item-about">
                                    <Link to="/about">关于</Link>
                                </MenuItem>
                                <MenuItem>
                                    <Badge count={notificationCount} offset={[8, 0]} style={{background: "#FF6E4A"}}>
                                        <span>通知</span>
                                    </Badge>
                                </MenuItem>
                                <MenuItem className="menu-item-login">
                                    { currentUser ? <NavbarAvatar {...currentUser} /> : <Link to="/login">登录</Link>}
                                </MenuItem>
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </header>
        );
    }
};

export default Navigation;
