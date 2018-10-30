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
import InfiniteScroll from "react-infinite-scroller";
import { topicItemRenderer, TopicListHeader } from "../../components/topic"
import TopicList from "../../components/topic/list";
import Navigation from "../../components/nav";
import SubNavigation from "../../components/nav/sub";
import InfiniteScrollLoader from "../../components/common/infinite-scroller/loader";
import {
    fetchTopTopicsAction,
    markNotificationAction,
    fetchAllCategories,
    cleanTopTopicsAction
} from "../../actions/user-action-creator";
import Moment from "moment";
import "./style.scss";

class TopTopicContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false
        }

        this.loadMoreTopics = this.loadMoreTopics.bind(this);
    }

    componentDidMount() {
        this.props.cleanTopTopicsAction();
        this.props.fetchAllCategories();
    }

    render() {
        const categoryId = this.props.match.params.categoryId;
        const {topics, currentUser, notifications, categories} = this.props;

        const currentCategory = categories.find(c => c.id == this.props.match.params.categoryId);

        return (
            <div className="home">
                <Navigation
                    currentUser={currentUser}
                    notifications={notifications}
                    onClickNotification={this.props.markNotificationAction}
                />
                <div className="main-wrapper">
                    <div className="container">
                        <div className="category-nav flex justify-between">
                            <SubNavigation
                                path={categoryId ? `/categories/${categoryId}` : ""}
                                categories={categories}
                                currentCategory={currentCategory}
                            />
                            <div className="flex items-center">
                                <AnchorButton icon="plus" href="/t/new" intent="success">创建话题</AnchorButton>
                            </div>
                        </div>
                        <InfiniteScroll
                            pageStart={0}
                            hasMore={!topics.pagination.is_last_page}
                            loader={ <InfiniteScrollLoader key={0} /> }
                            loadMore={this.loadMoreTopics}
                            threshold={100}
                        >
                            <TopicList
                                topics={topics}
                                itemRenderer={topicItemRenderer}
                                header={<TopicListHeader/>}
                            />
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        );
    }

    loadMoreTopics() {
        const { pagination } = this.props.topics;

        const page_params = {
            page: pagination.current_page + 1,
            per_page: pagination.per_page
        }

        if (!this.state.isFetching && !pagination.is_last_page) {
            this.setState({ isFetching: true });

            const categoryId = this.props.match.params.categoryId;
            if (categoryId) {
                this.props.fetchTopTopicsAction({
                    filter: {category_id: categoryId},
                    pagination: page_params
                }).then(json => {
                   this.setState({ isFetching: false });
                });
            } else {
                this.props.fetchTopTopicsAction({ pagination: page_params}).then(json => {
                    this.setState({ isFetching: false });
                });
            }
        }
    }
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    notifications: state.user.notifications,
    topics: state.topic.top,
    categories: state.category.categories
})


export default connect(mapStateToProps, {
    fetchTopTopicsAction,
    markNotificationAction,
    fetchAllCategories,
    cleanTopTopicsAction
})(TopTopicContainer);
