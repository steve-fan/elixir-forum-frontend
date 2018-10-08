import React, { Component } from "react";
import TrixEditor from "../../components/trix-editor";
import { Button } from "@blueprintjs/core";

class PostCommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "{}"
        }
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="ep-comment-form pt2">
                <img className="avatar comment-avatar" alt="avatar" src="/avatar.png" />
                <TrixEditor
                    placeholder="添加评论..."
                    value={this.state.content}
                    uploadURL="/api/image.upload"
                    uploadData={{}}
                    onChange={this.handleContentChange}
                />
                <div className="pt2">
                    <Button
                        intent="success"
                        onClick={this.handleSubmit}
                    >
                        添加评论
                    </Button>
                </div>
            </div>
        );
    }

    handleContentChange(html, raw) {
        this.setState({ content: html });
    }

    handleSubmit(e) {
        this.props.onSubmit(this.state.content);
    }
};

export default PostCommentForm;
