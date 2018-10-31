import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import Tag from "antd/lib/tag";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { TagLink } from "../tag";
import TopicContent from "./content";
import Post from "../post";

export const topicItemRenderer = (item) => {
    return (
        <Row key={item.id} className="topic-item flex items-center">
            <Col span={12}>
                <div className="topic-title">
                    <Link to={`/t/${item.id}`}>{item.title}</Link>
                </div>
                <div className="topic-tags">
                    {item.tags.map(t => <Tag key={t.id}>{t.name}</Tag>) }
                </div>
            </Col>
            <Col span={4} className="topic-category">
                <Link to={`/categories/${item.category.id}`}>
                    <Tag color={item.category.background}>{item.category.name}</Tag>
                </Link>
            </Col>
            <Col span={4} className="topic-users">
                <img alt={item.creator.name} src={item.creator.avatar_url} />
                {item.post_users.map(u => <img key={u.id} alt={u.name} src={u.avatar_url} />)}
            </Col>
            <Col span={1} className="topic-posts-count">{item.posts_count}</Col>
            <Col span={1}>{item.views_count}</Col>
            <Col span={2}>{Moment(item.created_at).fromNow()}</Col>
        </Row>
    );
}

export const TopicListHeader = (props) => (
    <Row className="topic-list-header">
        <Col span={12}>标题</Col>
        <Col span={4}>分类</Col>
        <Col span={4}>活跃用户</Col>
        <Col span={1}>评论</Col>
        <Col span={1}>浏览</Col>
        <Col span={2}>活跃度</Col>
    </Row>
)

export const Topic = ({topic, onSubmitReply}) => (
    <div>
        <div className="h2 pt3 pb1">{topic.title}</div>
        <div className="flex pb2">
            <Link to={`/categories/${topic.category.id}`}>
                <Tag color={topic.category.background}>{topic.category.name}</Tag>
            </Link>
            { topic.tags.map(tag => <TagLink key={tag.id} {...tag} />) }
        </div>
        <TopicContent {...topic} />
        <div>
            { topic.posts.map(post => <Post key={post.id} post={post} onSubmitReply={onSubmitReply} />)}
        </div>
    </div>
)
