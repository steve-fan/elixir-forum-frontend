import React, { Component } from "react";
import { Button } from "@blueprintjs/core";
import TrixEditor from "../trix-editor";

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        }

        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="ep-comment-form pt2">
                <img
                    className="avatar comment-avatar"
                    alt="avatar" src="/avatar.png"
                />
                <TrixEditor
                    placeholder="撰写评论..."
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
        )
    }

    handleContentChange(html, raw) {
        this.setState({ content: html });
    }

    handleSubmit(e) {
        this.props.onSubmit(this.state.content).then(json => {
            this.setState({ content: "here" });
        });
    }
};

export default PostForm;
