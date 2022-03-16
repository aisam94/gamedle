import React, { useState, useEffect } from "react";

const Keyboard = ({
  onChar,
  onEnter,
  onDelete,
  usedLetters,
  yellowLetters,
  correctLetters,
}) => {
  const handleClick = (e) => {
    if (e.target.value === "Enter") {
      onEnter();
    } else if (e.target.value === "Delete") {
      onDelete();
    } else {
      onChar(e.target.value);
    }
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => {
          //set up the color of the keyboard buttons
          const color = "";
          if (correctLetters.includes(key)) {
            color = "green";
          } else if (yellowLetters.includes(key)) {
            color = "yellow";
          } else if (usedLetters.includes(key)) {
            color = "gray";
          }
          return (
            <button
              className={`key-btn ${color}`}
              value={key}
              key={key}
              onClick={handleClick}
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboard-row">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => {
          //set up the color of the keyboard buttons
          const color = "";
          if (correctLetters.includes(key)) {
            color = "green";
          } else if (yellowLetters.includes(key)) {
            color = "yellow";
          } else if (usedLetters.includes(key)) {
            color = "gray";
          }
          return (
            <button
              className={`key-btn ${color}`}
              value={key}
              key={key}
              onClick={handleClick}
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboard-row">
        <button
          className="key-btn long-key-btn"
          value="Enter"
          onClick={handleClick}
        >
          ENTER
        </button>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => {
          //set up the color of the keyboard buttons
          const color = "";
          if (correctLetters.includes(key)) {
            color = "green";
          } else if (yellowLetters.includes(key)) {
            color = "yellow";
          } else if (usedLetters.includes(key)) {
            color = "gray";
          }
          return (
            <button
              className={`key-btn ${color}`}
              value={key}
              key={key}
              onClick={handleClick}
            >
              {key}
            </button>
          );
        })}
        <button
          className="key-btn long-key-btn"
          value="Delete"
          onClick={handleClick}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
