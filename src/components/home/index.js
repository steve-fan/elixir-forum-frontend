import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Tag from "antd/lib/tag";
import Menu, { Item as MenuItem } from "antd/lib/menu";
import {Select} from "@blueprintjs/select";
import { Button as BPButton } from "@blueprintjs/core"
import { topicItemRenderer, TopicListHeader } from "../../components/topic"
import List from "../../components/list";
import { fetchLatestTopics } from "../../services/api";
import Moment from "moment";
import "./style.scss"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestTopics: {
                data: []
            }
        }
    }

    componentDidMount() {
        fetchLatestTopics().then(json => {
            this.setState({
                latestTopics: json.data
            })
        })
    }

    render() {
        const {latestTopics} = this.state;
        console.log(this.state.latestTopics);

        return (
            <div className="home">
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
                                    <MenuItem className="menu-item-login">
                                        <Link to="/login">登录</Link>
                                    </MenuItem>
                                </Menu>
                            </Col>
                        </Row>
                    </div>
                </header>
                <div className="main-wrapper">
                    <div className="container">
                        <div className="category-nav flex">
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
                        </div>
                        <TopicListHeader />
                        <div className="latest-topics">
                            <List items={latestTopics.data} itemRenderer={topicItemRenderer} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const TopicHeader = () => (
    <Row type="flex">
        <Col span={12}>标题</Col>
        <Col span={4}>分类</Col>
        <Col span={4}>用户</Col>
        <Col span={1}>评论</Col>
        <Col span={1}>查看</Col>
        <Col span={2}>活跃度</Col>
    </Row>
);


export default Home;
