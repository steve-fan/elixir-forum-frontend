import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";

import { createPost } from "../../services/api";
import TrixEditor from "../../components/trix-editor";
import "./style/_index.scss";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: ""
        }

        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSaveDraft = this.handleSaveDraft.bind(this);
    }

    render() {
        return (
            <div className="container ep-post-container pt2">
                <form action="">
                    <div className="mb2">
                        <input
                            className="bp3-input bp3-fill bp3-large"
                            type="text"
                            placeholder="Title..."
                            onChange={this.handleTitleChange}
                        />
                    </div>
                    <div className="mb2">
                        <TrixEditor
                            placeholder="editor's placeholder"
                            value="initial content <strong>for the editor</strong>"
                            uploadURL="/api/image.upload"
                            uploadData={{}}
                            onChange={this.handleContentChange}
                        />
                    </div>
                    <div>
                        <Button
                            className="mr2"
                            onClick={this.handleSaveDraft}
                        >
                            Save daft
                        </Button>
                        <Button
                            intent="success"
                            onClick={this.handleSubmit}
                        >
                            Create post
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleContentChange(html, rawContent) {
        this.setState({ content: html })
    }

    handleSubmit(e) {
        const params = {
            post: {
                title: this.state.title,
                content: this.state.content
            }
        };

        createPost(params).then(response => {
            return response.json()
        }).then(json => {
            console.log(json);
        })
    }

    handleSaveDraft(e) {
    }
}

export default App;
