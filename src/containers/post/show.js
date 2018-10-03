import React, { Component } from "react";
import Spin from "antd/lib/spin";
import "./_index.scss";

class PostShowContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            post: null
        }
    }

    componentDidMount() {
        fetch("/api/post.show", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.props.match.params.postId })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({ post: json.data, loading: false });
        });
    }

    render() {
        const { match } = this.props;
        const { loading, post } = this.state;

        return (
            <div className="container ep-post-container">
                { loading ?
                  <Spin spinning={loading}></Spin> :
                  <Post {...post} />
                }
            </div>
        );
    }
};

const Post = ({title, content}) => (
    <div>
        <div className="h1 pt2 pb2">{title}</div>
        <div className="trix-content trix-preview" dangerouslySetInnerHTML={{__html: content}} />
    </div>
);

export default PostShowContainer;
