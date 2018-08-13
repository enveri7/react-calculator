import React, { Component } from "react";
import "./App.css";
import Button from "./Button";
import Input from "./Input";
import ListItem from "./ListItem";

class App extends Component {
  state = {
    buttons: [
      ["1", "2", "3", "+"],
      ["4", "5", "6", "-"],
      ["7", "8", "9", "*"],
      ["ans", "0", "=", "/"]
    ],
    input: "",
    ans: [],
    ans_active: false,
    error: false,
    error_message: ""
  };

  componentDidMount() {
    document.getElementById("input-div").focus();
    const ans = localStorage.getItem("simplecalc-lc");
    if (ans) {
      this.setState({ ans: JSON.parse(ans) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("simplecalc-lc", JSON.stringify(this.state.ans));
  }

  handleButtonClick = char => {
    const input = this.state.input;
    if (char === "ans") {
      const div = document.getElementById("dropdown-content");
      if (this.state.ans_active === false) {
        div.classList.add("dropdown-content-active");
        this.setState({ ans_active: true });
      } else {
        div.classList.remove("dropdown-content-active");
        this.setState({ ans_active: false });
      }
    } else if (char === "=") {
      this.calculate(input);
    } else {
      if (input == null) {
        this.setState({ input: char });
      } else {
        this.setState({ input: input + char });
      }
      document.getElementById("input-div").focus();
    }
  };

  updateInput = input => {
    this.setState({ input: input });
    document.getElementById("input-div").focus();
  };

  calculate = (input = this.state.input) => {
    if (input === "") {
      return;
    }
    // Take copy of existing state
    const ans = this.state.ans;
    try {
      const result = eval(input);
      if (result === undefined || result === null || result === "") {
        this.setState({
          error: true,
          error_message: "Calculation cannot be performed"
        });
        return;
      }
      if (ans.length < 5) {
        ans.unshift({ key: `ans_${Date.now()}`, value: input });
        this.setState({ ans });
      } else {
        ans.pop();
        ans.unshift({ key: `ans_${Date.now()}`, value: input });
        this.setState({ ans });
      }
      this.setState({ input: result });
      this.setState({
        error: false,
        error_message: ""
      });
      const div = document.getElementById("error_div");
      div.classList.remove("error-active");
    } catch (err) {
      this.setState({
        error: true,
        error_message: "Calculation cannot be performed"
      });
    }
    document.getElementById("input-div").focus();
  };

  render() {
    let error_div = <div id="error_div" className="error-div" />;
    if (this.state.error) {
      error_div = (
        <div id="error_div" className="error-div">
          {this.state.error_message}
        </div>
      );
      const div = document.getElementById("error_div");
      if (div) {
        div.classList.add("error-active");
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Simple Calc</h1>
        </header>
        <div className="err">{error_div}</div>
        <Input
          input={this.state.input}
          updateInput={this.updateInput}
          calculate={this.calculate}
        />
        <div className="dropdown">
          <div>
            {this.state.buttons.map(list => (
              <div className="buttons-container" key={list[0]}>
                {list.map(char => (
                  <Button
                    key={char}
                    char={char}
                    handleButtonClick={this.handleButtonClick}
                  />
                ))}
              </div>
            ))}
          </div>{" "}
          <div id="dropdown-content" className="dropdown-content">
            <ul>
              {this.state.ans.map(item => (
                <ListItem
                  key={item.key}
                  item={item.value}
                  updateInput={this.updateInput}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
