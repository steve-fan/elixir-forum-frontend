import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@blueprintjs/core";
import TrixEditor from "../../components/trix-editor";
import {
    fetchTopicAction
} from "../../actions/user-action-creator";

class EditTopicContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: ""
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const topicId = this.props.match.params.topicId;
        this.props.fetchTopicAction(topicId);
    }

    render() {
        const { topic } = this.props;

        let element;
        if (topic) {
            element = (
                <div>
                    <div className="mb2">
                        <input
                            className="bp3-input bp3-fill bp3-large"
                            type="text"
                            placeholder="Title..."
                            value={topic.title}
                            onChange={this.handleTitleChange}
                        />
                    </div>
                    <div className="mb2">
                        <TrixEditor
                            placeholder="editor's placeholder"
                            value={topic.content}
                            uploadURL="/api/image.upload"
                            uploadData={{}}
                            onChange={this.handleContentChange}
                        />
                    </div>
                    <Button intent="success" onClick={this.handleSubmit}>修改话题</Button>
                </div>
            );
        } else {
            element = <div>loading</div>;
        }

        return (
            <div className="container ep-post-container">
                {element}
            </div>
        );
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleContentChange(html, raw) {
        this.setState({content: html});
    }

    handleSubmit() {
        const params = {
            id: this.props.match.params.postId,
            title: this.state.post.title,
            content: this.state.post.content
        }
    }
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    topic: state.topic.currentTopic,
})

export default connect(mapStateToProps, {
    fetchTopicAction
})(EditTopicContainer);
