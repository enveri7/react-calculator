import React from "react";

class Button extends React.Component {
  handleClick = char => {
    this.props.handleButtonClick(char);
  };

  render() {
    return (
      <div
        className="button-div"
        onClick={() => this.handleClick(this.props.char)}
      >
        {this.props.char}
      </div>
    );
  }
}

export default Button;
