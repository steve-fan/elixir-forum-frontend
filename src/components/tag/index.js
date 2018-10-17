import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tag from "antd/lib/tag";

export const TagLink = ({name}) => (
    <Link to={`/tags/${name}`}>
        <Tag>{name}</Tag>
    </Link>
)
