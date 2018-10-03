import React, { Component } from "react";
import { Button } from "@blueprintjs/core";
import TrixEditor from "../../components/trix-editor";
import { fetchPost, updatePost } from "../../services/api";

class PostEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            post: null,
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        fetchPost(postId).then(json => {
            this.setState({
                post: json.data,
                loading: false
            });
        })
    }

    render() {
        const {post, loading} = this.state;

        let element;
        if (loading) {
            element = <div>loading</div>;
        } else {
            element = (
                <div>
                    <div className="mb2">
                        <input
                            className="bp3-input bp3-fill bp3-large"
                            type="text"
                            placeholder="Title..."
                            value={post.title}
                            onChange={this.handleTitleChange}
                        />
                    </div>
                    <div className="mb2">
                        <TrixEditor
                            placeholder="editor's placeholder"
                            value={post.content}
                            uploadURL="/api/image.upload"
                            uploadData={{}}
                            onChange={this.handleContentChange}
                        />
                    </div>
                    <Button intent="success" onClick={this.handleSubmit}>Update post</Button>
                </div>
            );
        }

        return (
            <div className="container ep-post-container">
                {element}
            </div>
        );
    }

    handleTitleChange(e) {
        this.setState({
            post: {
                ...this.state.post,
                title: e.target.value
            }
        });
    }

    handleContentChange(html, raw) {
        this.setState({
            post: {
                ...this.state.post,
                content: html
            }
        });
    }

    handleSubmit() {
        console.log(this.state.post);
        const params = {
            id: this.props.match.params.postId,
            title: this.state.post.title,
            content: this.state.post.content
        }
        updatePost(params).then(json => {
            this.setState({ post: json.data })
        });
    }
};

export default PostEditContainer;
