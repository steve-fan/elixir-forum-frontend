import React, { Component } from "react";

class List extends Component {
    render() {
        const { className, items, itemRenderer } = this.props;

        return (
            <div className={className}>
                {items.map(itemRenderer)}
            </div>
        );
    }
};

export default List;
