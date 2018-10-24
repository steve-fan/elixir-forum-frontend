import React, { Component } from "react";
import TrixEditor from "../trix-editor";
import { Button } from "@blueprintjs/core";

class PostReplyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="post-reply py1">
                <div className="post-reply__editor py1">
                    <TrixEditor
                        placeholder="撰写评论..."
                        value={this.state.content}
                        uploadURL="/api/image.upload"
                        uploadData={{}}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="post-reply__actions">
                    <Button className="mr2" intent="success" onClick={this.handleSubmit}>发表评论</Button>
                    <Button intent="danger" onClick={this.props.onCancel}>取消</Button>
                </div>
            </div>
        );
    }

    handleChange(content, raw) {
        this.setState({content});
    }

    handleSubmit() {
        const { post } = this.props;
        const params = {
            content: this.state.content,
            parent_post_id: post.id,
            topic_id: post.topic_id
        }
        this.props.onSubmit(params);
    }
};

export default PostReplyForm;
