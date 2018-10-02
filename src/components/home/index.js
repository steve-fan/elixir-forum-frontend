import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";
import TrixEditor from "../../components/trix-editor";
import "./style/_index.scss";


class App extends Component {
    render() {
        return (
            <div className="container ep-post-new pt2">
                <form action="">
                    <div className="mb2">
                        <input className="bp3-input bp3-fill bp3-large" type="text" placeholder="Title..." />
                    </div>
                    <TrixEditor
                        placeholder="editor's placeholder"
                        value="initial content <strong>for the editor</strong>"
                        uploadURL="/api/image.upload"
                        uploadData={{}}
                    />
                    <Button intent="success">Create Post</Button>
                </form>
            </div>
        );
    }
}

export default App;
