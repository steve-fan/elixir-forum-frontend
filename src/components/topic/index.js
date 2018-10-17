import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import Tag from "antd/lib/tag";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

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
                <Tag color={item.category.background}>{item.category.name}</Tag>
            </Col>
            <Col span={4} className="topic-users">
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
        <Col span={4}>用户</Col>
        <Col span={1}>评论</Col>
        <Col span={1}>浏览</Col>
        <Col span={2}>活跃度</Col>
    </Row>
)
