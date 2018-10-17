import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Tag from "antd/lib/tag";
import Menu, { Item as MenuItem } from "antd/lib/menu";
import {Select} from "@blueprintjs/select";
import { Button as BPButton } from "@blueprintjs/core"
import { AnchorButton } from "@blueprintjs/core";
import { Popover } from "@blueprintjs/core";
import { Menu as BPMenu } from "@blueprintjs/core";
import { MenuItem as BPMenuItem } from "@blueprintjs/core";
import { topicItemRenderer, TopicListHeader } from "../../components/topic"
import TopicList from "../../components/topic/list";
import Navigation from "../../components/nav";
import SubNavigation from "../../components/nav/sub";
import {
    fetchLatestTopicsAction,
    fetchCurrentUser
} from "../../actions/user-action-creator";
import Moment from "moment";
import "./style.scss"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.fetchLatestTopicsAction();
        this.props.fetchCurrentUser();
    }

    render() {
        const {topics, currentUser} = this.props;

        return (
            <div className="home">
                <Navigation currentUser={currentUser} />
                <div className="main-wrapper">
                    <div className="container">
                        <div className="category-nav flex justify-between">
                            <SubNavigation />
                            <div className="flex items-center">
                                <AnchorButton icon="plus" href="/t/new" intent="success">创建话题</AnchorButton>
                            </div>
                        </div>
                        <TopicList
                            topics={topics}
                            itemRenderer={topicItemRenderer}
                            header={<TopicListHeader/>}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    topics: state.topic.topics
})


export default connect(mapStateToProps, {
    fetchLatestTopicsAction,
    fetchCurrentUser
})(Home);
