import React from "react";
import "./Input.css";

export const Input = (props) => (
  <div style={{ overflow: "hidden" }} className="input">
    {props.input}
  </div>
);

// () => function()
