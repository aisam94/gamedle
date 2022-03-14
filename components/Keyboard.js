import React, { useState, useEffect } from "react";

const Keyboard = () => {
  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => {
          return <button key={key}>{key}</button>;
        })}
      </div>
      <div className="keyboard-row">
        {["A", "S", "D,", "F", "G", "H", "J", "K", "L"].map((key) => {
          return <button key={key}> {key}</button>;
        })}
      </div>
      <div className="keyboard-row">
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => {
          return <button key={key}> {key}</button>;
        })}
      </div>
    </div>
  );
};

export default Keyboard;
