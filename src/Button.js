import React from "react";

class Button extends React.Component {
  render() {
    return <div className="button-div">{this.props.char}</div>;
  }
}

export default Button;
