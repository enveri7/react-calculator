import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./Button";
import Input from "./Input";

class App extends Component {
  state = {
    buttons: [
      ["1", "2", "3", "+"],
      ["4", "5", "6", "-"],
      ["7", "8", "9", "*"],
      ["ans", "0", "=", "/"]
    ],
    input: "",
    ans: []
  };

  handleButtonClick = char => {
    const input = this.state.input;
    if (char === "ans") {
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
  };

  calculate = (input = this.state.input) => {
    const ans = this.state.ans;
    console.log(ans);
    console.log("calculate " + input);
    try {
      const result = eval(input);
      if (ans.length < 5) {
        this.setState(() => ({
          ans: [...ans, input]
        }));
      } else {
        this.setState(() => ({
          ans: ans.slice(1, 5).concat(input)
        }));
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
      </div>
    );
  }
}

export default App;
