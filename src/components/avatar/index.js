import React, { Component } from "react";

class Avatar extends Component {
    render() {
        const {url, alt} = this.props;
        return (
            <img src={url} alt={alt} />
        );
    }
};

export const UserAvatar = ({name, avatar_url}) => (
    <img className="avatar" src={avatar_url} alt={name} />
)

export default Avatar;
