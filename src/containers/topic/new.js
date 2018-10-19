import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button as BPButton, TagInput } from "@blueprintjs/core";
import Navigation from "../../components/nav";
import CategorySelect from "../../components/category/select";
import TrixEditor from "../../components/trix-editor";

import {
    fetchAllCategories,
    createTopic
} from "../../actions/user-action-creator";

import "./style.scss";

class NewTopicContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: "",
            selectedCategory: null,
            tags: []
        }

        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllCategories()
    }

    render() {
        const {currentUser, categories, notifications} = this.props;
        const { selectedCategory } = this.state;

        return (
            <div className="topic-new">
                <Navigation currentUser={currentUser} notifications={notifications} />
                <div className="container ep-post-container pt2">
                    <form action="">
                        <div className="mb2">
                            <input
                                className="bp3-input bp3-fill bp3-large"
                                type="text"
                                placeholder="标题：确保标题简单明了..."
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div className="mb2 flex">
                            <CategorySelect
                                items={categories}
                                selectedItem={this.state.selectedCategory}
                                onItemSelect={this.handleCategorySelect}
                            />
                            <TagInput
                                className="ml2 tag-input"
                                values={this.state.tags}
                                tagProps={{minimal: true}}
                                placeholder="添加标签（可选项，最多三个标签）..."
                                onChange={this.handleTagChange}
                            />
                        </div>
                        <div className="mb2">
                            <TrixEditor
                                placeholder={selectedCategory ? selectedCategory.wiki : "输入描述之前必须先选择一个分类..."}
                                value=""
                                uploadURL="/api/image.upload"
                                uploadData={{}}
                                onChange={this.handleContentChange}
                            />
                        </div>
                        <div>
                            <BPButton
                                intent="success"
                                onClick={this.handleSubmit}
                            >
                                创建话题
                            </BPButton>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleContentChange(html, rawContent) {
        this.setState({ content: html })
    }

    handleSubmit() {
        const params = {
            topic: {
                title: this.state.title,
                content: this.state.content,
                category_id: this.state.selectedCategory.id,
                tags: this.state.tags.map(tag => ({name: tag}))
            }
        }
        this.props.createTopic(params).then(json => {
            if (json.success) {
                this.props.history.push(`/t/${json.data.id}`)
            }
        })
    }

    handleCategorySelect(selectedCategory) {
        this.setState({selectedCategory});
    }

    handleTagChange(tags) {
        this.setState({ tags });
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        notifications: state.user.notifications,
        categories: state.category.categories
    }
}


export default connect(mapStateToProps, {
    fetchAllCategories,
    createTopic
})(NewTopicContainer);
