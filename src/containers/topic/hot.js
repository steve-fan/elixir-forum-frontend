import React, { Component } from "react";
import { fetchHotPosts } from "../../services/api"
import { Link } from "react-router-dom";

class HotPostContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            pagination: {}
        }
    }

    componentDidMount() {
        fetchHotPosts().then(({data, pagination}) => {
            this.setState({ posts: data.data, pagination });
        });
    }

    render() {
        const { posts } = this.state;

        return (
            <div className="container">
                {
                    posts.map(p => <HotPostItem key={p.id} {...p} />)
                }
            </div>
        );
    }
};

const HotPostItem = ({title, id}) => (
    <div className="pb2">
        <Link to={`/p/${id}`}>
            {title}
        </Link>
    </div>
);

export default HotPostContainer;
