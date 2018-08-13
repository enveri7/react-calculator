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
    input: null
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* {this.state.buttons.map(char => (
          <div className="buttons-container">
            <Button key={char} char={char} />
          </div>
        ))} */}
        <Input />
        {this.state.buttons.map(list => (
          <div className="buttons-container" key={list[0]}>
            {list.map(char => <Button key={char} char={char} />)}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
