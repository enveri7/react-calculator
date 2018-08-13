import React, { Component } from "react";
import logo from "./logo.svg";
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
    ans: {},
    ans_active: false
  };

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
    console.log(input);
    this.setState({ input: input });
    document.getElementById("input-div").focus();
  };

  calculate = (input = this.state.input) => {
    // Take copy of existing state
    const ans = { ...this.state.ans };
    console.log(ans[Object.keys(ans)[0]]);
    try {
      const result = eval(input);
      if (Object.keys(ans).length < 5) {
        ans[`ans_${Date.now()}`] = input;
        this.setState({ ans });
      } else {
        delete ans[Object.keys(ans)[0]];
        ans[`ans_${Date.now()}`] = input;
        this.setState({ ans });
      }
      this.setState({ input: result });
    } catch (err) {
      console.log(err);
    }
    document.getElementById("input-div").focus();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
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
              {Object.keys(this.state.ans).map(key => (
                <ListItem
                  key={key}
                  item={this.state.ans[key]}
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
