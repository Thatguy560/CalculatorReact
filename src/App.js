import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import * as math from "mathjs";

class App extends Component {
  constructor(props) {
    super(props); // Call super because we're extending the component class

    this.state = {
      // Gives the calculator the ability to accept numbers and operators.
      input: "", // input value is initially an empty string
      displayValue: "0",
    };
  }

  addToInput = (val) => {
    this.setState({ input: this.state.input + val }); // Method that allows you to change value of state.
  };

  calculatePercentage = () => {
    const displayValue = this.state.input;
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;

    this.setState({
      input: String(newValue.toFixed(fixedDigits.length + 2)),
    });
  };

  // When we call = we will trigger this function that does math evaluation of current input
  Calculate = () => {
    try {
      this.setState({
        input:
          (math.evaluate(
            this.state.input
              .replace("×", "*")
              .replace("÷", "/")
              .replace("√(", "sqrt(")
              .replace("∛(", "cbrt(")
              .replace("π", "3.141592653589793")
          ) || "") + "",
      });
    } catch (e) {
      this.setState({
        // catch (e) will catch any errors in the logic. Instead of crashing the app will return the message "syntax ERROR"
        input: "syntax ERROR",
      });
    }
  };

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input}></Input>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
            <Button handleClick={this.addToInput}>sin(</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
            <Button handleClick={this.addToInput}>cos(</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
            <Button handleClick={this.addToInput}>tan(</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={() => this.Calculate()}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
            <Button handleClick={this.addToInput}>log(</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>(</Button>
            <Button handleClick={this.addToInput}>)</Button>
            <Button handleClick={this.addToInput}>√(</Button>
            <Button handleClick={this.addToInput}>∛(</Button>
            <Button handleClick={this.addToInput}>^</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>abs(</Button>
            <Button handleClick={this.addToInput}>e</Button>
            <Button handleClick={this.addToInput}>π</Button>
            <Button handleClick={this.addToInput}>!</Button>
            <Button handleClick={this.calculatePercentage}>%</Button>
          </div>

          <div className="row">
            {/* input: "" - This sets the input back to an empty string or removes what we have entered. */}
            <ClearButton
              handleClear={() =>
                // Will change the input state by deleting or clearing values or operator.
                this.setState({
                  input:
                    this.state.input.slice(-2) === "√("
                      ? this.state.input.slice(0, -2)
                      : this.state.input.slice(-8) === "Infinity"
                      ? this.state.input.slice(0, -8)
                      : this.state.input.slice(-3) === "∛("
                      ? this.state.input.slice(0, -3)
                      : this.state.input.slice(-4) === "sin(" ||
                        this.state.input.slice(-4) === "cos(" ||
                        this.state.input.slice(-4) === "tan(" ||
                        this.state.input.slice(-4) === "log(" ||
                        this.state.input.slice(-4) === "abs("
                      ? this.state.input.slice(0, -4)
                      : this.state.input.includes("syntax ERROR") // If syntax ERROR, then "DEL" will set the state back to an empty string
                      ? ""
                      : this.state.input.slice(0, -1), // If just a normal operator or number, "DEL" will only remove the first element of string.
                })
              }
            >
              DEL
            </ClearButton>
            <ClearButton handleClear={() => this.setState({ input: "" })}>
              AC
            </ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// npm install mathjs - math.js can evaluate expressions
// and supports chained operations.
