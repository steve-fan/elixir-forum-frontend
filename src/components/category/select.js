import React, { Component } from "react";
import { Select as BPSelect } from "@blueprintjs/select";
import {
    Button as BPButton,
    Menu as BPMenu,
    MenuItem as BPMenuItem
} from "@blueprintjs/core";

const categorySelectItemRenderer = (category, { handleClick, modifiers, query}) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }

    return (
        <BPMenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            key={category.id}
            onClick={handleClick}
            text={category.name}
        />
    );
}

const filterCategory = (query, category) => {
    return `${category.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
}

class CategorySelect extends Component {
    render() {
        const { selectedItem } = this.props;

        return (
            <BPSelect
                items={this.props.items}
                itemPredicate={filterCategory}
                itemRenderer={categorySelectItemRenderer}
                onItemSelect={this.props.onItemSelect}
            >
                <BPButton
                    text={selectedItem ? selectedItem.name : "分类..."}
                    rightIcon="caret-down"
                />
            </BPSelect>
        );
    }
};

export default CategorySelect;
