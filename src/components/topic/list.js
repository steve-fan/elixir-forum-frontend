import React, { Component } from "react";
import { topicItemRenderer } from "./index";
import List from "../list";

class TopicList extends Component {
    render() {
        const {header, topics} = this.props;

        return (
            <div className="latest-topics">
                { header }
                <List items={topics.data} itemRenderer={topicItemRenderer} />
            </div>
        );
    }
};

TopicList.defaultProps = {
    topics: {
        data: []
    }
}

export default TopicList;
