import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu, { Item as MenuItem } from "antd/lib/menu";
import { AnchorButton } from "@blueprintjs/core";

class SubNavigation extends Component {
    render() {
        return (
            <Menu mode="horizontal" style={{marginLeft: -20}}>
                <MenuItem>
                    <Link to="/latest">最新</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/top">热门</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/categories">所有分类</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/tags">所有标签</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/bookmarks">收藏</Link>
                </MenuItem>
            </Menu>
        );
    }
};

export default SubNavigation;
