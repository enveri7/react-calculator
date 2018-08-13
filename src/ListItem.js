import React from "react";

class ListItem extends React.Component {
  handleClick = () => {
    console.log(this.props.item);
    this.props.updateInput(this.props.item);
  };

  render() {
    return <li onClick={this.handleClick}>{this.props.item}</li>;
  }
}

export default ListItem;
