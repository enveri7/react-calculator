import React from "react";

class ListItem extends React.Component {
  handleClick = () => {
    this.props.updateInput(this.props.item);
  };

  render() {
    return <li onClick={this.handleClick}>{this.props.item}</li>;
  }
}

export default ListItem;
