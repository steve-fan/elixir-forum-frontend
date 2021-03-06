import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Menu, { Item as MenuItem } from "antd/lib/menu";
import { Menu as BPMenu, MenuItem as BPMenuItem} from "@blueprintjs/core";
import { AnchorButton, Button, Icon } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import Tag from "antd/lib/tag";

const categorySelectItemRenderer = (category, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }

    return (
        <BPMenuItem
            className="category-select-item"
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={category.topics_count}
            key={category.id}
            onClick={handleClick}
            href={`/categories/${category.id}`}
            text={<Tag color={category.background}>{category.name}</Tag>}
        />
    );
}

const categoryPreciate = (query, category) => {
    return `${category.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
}

class SubNavigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: null
        }

        this.handleSelectCategoryItem = this.handleSelectCategoryItem.bind(this);
    }

    render() {
        const {path} = this.props;
        const category = this.state.category ? this.state.currentCategory : this.props.currentCategory;

        return (
            <Menu mode="horizontal" style={{marginLeft: -20}}>
                <MenuItem>
                    <Select
                        items={this.props.categories}
                        itemPredicate={categoryPreciate}
                        itemRenderer={categorySelectItemRenderer}
                        onItemSelect={this.handleSelectCategoryItem}
                    >
                        {
                            category ?
                            <Tag color={category.background}><span>{category.name}</span> <Icon icon="caret-down" /></Tag> :
                            <div><span>所有分类</span><Icon icon="caret-down" /></div>
                        }
                    </Select>
                </MenuItem>
                <MenuItem>
                    <NavLink to={path ? path : "/"} exact activeClassName="nav-link-active" >
                        <span>最新</span>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to={`${path}/top`} exact activeClassName="nav-link-active">
                        <span>热门</span>
                    </NavLink>
                </MenuItem>
            </Menu>
        );
    }

    handleSelectCategoryItem(category) {
        this.setState({category})
    }
};

export default SubNavigation;
