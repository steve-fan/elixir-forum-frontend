import React from "react";
import PropTypes from 'prop-types';

class TrixEditor extends React.Component {
    constructor(props) {
        super(props);

        this.id = this.generateId();
        this.container = null;
        this.editor = null;
        this.d = null;

        this.state = {
            showMergeTags: false,
            tags: []
        }
    }

    generateId() {
        let timestamp = Date.now();
        let uniqueNumber = 0;

        (() => {
            // If created at same millisecond as previous
            if (timestamp <= uniqueNumber) {
                timestamp = ++uniqueNumber;
            } else {
                uniqueNumber = timestamp;
            }
        })();
        return "T" + timestamp.toString();
    }

    componentDidMount() {
        let props = this.props;

        this.container = document.getElementById(`editor-${this.id}`);
        //this.container = this.d && this.d.children && this.d.children.length >= 2 ? this.d.children[1] : null;
        //this.editor = this.d;
        if (this.container) {
            this.container.addEventListener("trix-initialize", () => {
                this.editor = this.container.editor;
                if (!this.editor) {
                    console.error("cannot  find trix editor");
                }

                if (props.onEditorReady && typeof props.onEditorReady == "function") {
                    props.onEditorReady(this.editor);
                }
            }, false);
            this.container.addEventListener('trix-change', this.handleChange.bind(this), false);

            if (props.uploadURL) {
                this.container.addEventListener("trix-attachment-add", this.handleUpload.bind(this));
            }
        } else {
            console.error("editor not found");
        }
    }

    componentWillUnmount() {
        this.container.removeEventListener("trix-initialize", this.handleChange);
        this.container.removeEventListener("trix-change", this.handleChange);

        if (this.props.uploadURL) {
            this.container.removeEventListener("trix-attachment-add", this.handleUpload);
        }
    }

    handleChange(e) {
        const props = this.props;
        let state = this.state;
        const text = e.target.innerText;

        if (props.onChange) {
            props.onChange(e.target.innerHTML, text);
        }

        const range = this.editor.getSelectedRange();

        // if we have a collapse selection
        if (text && range[0] == range[1]) {
            // if we have a merge tag mergeTagTrigger
            if (props.mergeTags) {
                // get the cursor position and compare the last character with our mergeTagTrigger
                const lastChar = range[0] - 1;
                if (lastChar >= 0 && lastChar < text.length) {
                    const trigger = text[lastChar];
                    for (let i = 0; i < props.mergeTags.length; i++) {
                        if (trigger == props.mergeTags[i].trigger) {
                            state.showMergeTags = true;
                            state.tags = props.mergeTags[i].tags;
                            this.setState(state);
                            break;
                        }
                    }
                }
            }
        }
    }

    handleUpload(e) {
        var attachment = e.attachment;
        if (attachment.file) {
            return this.uploadAttachment(attachment);
        }
    }

    uploadAttachment(attachment) {
        var file, form, xhr;
        file = attachment.file;
        form = new FormData();
        // add any custom data that were passed
        if (this.props.uploadData) {
            for (var k in this.props.uploadData) {
                form[k] = this.props.uploadData[k];
            }
        }
        form.append("Content-Type", file.type);
        form.append("file", file);
        xhr = new XMLHttpRequest();
        xhr.open("POST", this.props.uploadURL, true);
        xhr.upload.onprogress = (event) => {
            var progress = event.loaded / event.total * 100;
            return attachment.setUploadProgress(progress);
        };
        xhr.onload = () => {
            var href, url;
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.responseText);
                url = href = xhr.responseText;
                return attachment.setAttributes({
                    url: url,
                    href: href
                });
            }
        };
        return xhr.send(form);
    }

    render() {
        let state = this.state;
        let props = this.props;

        var attributes: { [key: string]: string } = {
            "id": `editor-${this.id}`,
            "input": `input-${this.id}`,
            "class": "trix-content"
        };

        if (props.autoFocus) {
            attributes["autoFocus"] = props.autoFocus.toString();
        }

        if (props.placeholder) {
            attributes["placeholder"] = props.placeholder;
        }

        return (
            <div id="trix-editor-top-level" ref={(d) => this.d = d} style={{ "position": "relative" }}>
                {React.createElement("trix-editor", attributes)}
                <input
                    type="hidden"
                    id={`input-${this.id}`}
                    value={this.props.value}
                />
            </div>
        );
    }
}


TrixEditor.propTypes = {
    autoFocus: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    uploadURL: PropTypes.string,
    uploadData: PropTypes.object,
    onEditorReady: PropTypes.func,
    onChange: PropTypes.func
}

export default TrixEditor;
