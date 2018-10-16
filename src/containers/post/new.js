import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";
import TrixEditor from "../../components/trix-editor";
import { createPost, fetchHotPosts, logout } from "../../services/api";
import "./_index.scss";


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
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        fetchHotPosts({}).then(json => {
            console.log(json);
        });
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
                            placeholder="..."
                            value=""
                            uploadURL="/api/image.upload"
                            uploadData={{}}
                            onChange={this.handleContentChange}
                        />
                    </div>
                    <div>
                        <Button
                            intent="success"
                            onClick={this.handleSubmit}
                        >
                            Create post
                        </Button>
                    </div>
                </form>

                <div className="pt2">
                    <form action="/auth/logout" method="POST">
                        <Button type="submit" intent="danger">Logout</Button>
                    </form>
                </div>
            </div>
        );
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleContentChange(html, rawContent) {
        this.setState({ content: rawContent })
    }

    handleSubmit(e) {
        const params = {
            post: {
                title: this.state.title,
                content: this.state.content
            }
        };

        createPost(params).then(json => {
            console.log(json);
        });
    }

    handleLogout(e) {
    }
}

export default App;
