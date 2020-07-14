import React from "react";
import "./Button.css";

const isOperator = (val) => {
  return (
    !isNaN(val) ||
    val === "." ||
    val === "=" ||
    val === "÷" ||
    val === "×" ||
    val === "+" ||
    val === "-" ||
    val === "*" ||
    val === "/"
  );
};

export const Button = (props) => (
  <div
    className={`button-wrapper ${
      isOperator(props.children) ? null : "operator" // If not props.children return operator
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);

// () =>
// is the same as writing function()
