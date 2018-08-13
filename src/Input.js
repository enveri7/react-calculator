import React from "react";

class Input extends React.Component {
  componentDidMount() {
    this.props.updateInput(this.props.input);
  }

  handleChange = e => {
    this.props.updateInput(e.target.value);
  };

  render() {
    return (
      <div className="input-div">
        <input
          type="text"
          className="input-field"
          value={this.props.input}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Input;
