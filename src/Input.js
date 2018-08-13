import React from "react";

class Input extends React.Component {
  componentDidMount() {
    this.props.updateInput(this.props.input);
  }

  handleChange = e => {
    this.props.updateInput(e.target.value);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.calculate();
    }
  };

  render() {
    return (
      <div className="input-div">
        <input
          id="input-div"
          type="text"
          className="input-field"
          value={this.props.input}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default Input;
