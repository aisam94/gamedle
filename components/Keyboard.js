import React, { useState, useEffect } from "react";

const Keyboard = ({ onCharInput, onEnter, onDelete, letterStatus }) => {
  const [keyPressed, setKeyPressed] = useState("");
  const handleClick = (e) => {
    if (e.target.value === "Enter") {
      onEnter();
    } else if (e.target.value === "Delete") {
      onDelete();
    } else {
      onCharInput(e.target.value);
    }
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" || e.code === "Backspace") {
        setKeyPressed(e.code);
      } else {
        const key = e.key.toUpperCase();
        setKeyPressed(key);
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [keyPressed]);

  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => {
          //set up the color of the keyboard buttons
          const color = "";
          if (letterStatus.correctLetters.includes(key)) {
            color = "green";
          } else if (letterStatus.misplacedLetters.includes(key)) {
            color = "yellow";
          } else if (letterStatus.usedLetters.includes(key)) {
            color = "gray";
          }
          return (
            <button
              className={`key-btn ${color} ${
                keyPressed === key ? "keycap-pop" : ""
              }   `}
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
          if (letterStatus.correctLetters.includes(key)) {
            color = "green";
          } else if (letterStatus.misplacedLetters.includes(key)) {
            color = "yellow";
          } else if (letterStatus.usedLetters.includes(key)) {
            color = "gray";
          }
          return (
            <button
              className={`key-btn ${color}  ${
                keyPressed === key ? "keycap-pop" : ""
              }        `}
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
          className={`key-btn long-key-btn ${
            keyPressed === "Enter" ? "keycap-pop" : ""
          }`}
          value="Enter"
          onClick={handleClick}
        >
          ENTER
        </button>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => {
          //set up the color of the keyboard buttons
          const color = "";
          if (letterStatus.correctLetters.includes(key)) {
            color = "green";
          } else if (letterStatus.misplacedLetters.includes(key)) {
            color = "yellow";
          } else if (letterStatus.usedLetters.includes(key)) {
            color = "gray";
          }
          return (
            <button
              className={`key-btn ${color} ${
                keyPressed === key ? "keycap-pop" : ""
              }`}
              value={key}
              key={key}
              onClick={handleClick}
            >
              {key}
            </button>
          );
        })}
        <button
          className={`key-btn long-key-btn ${
            keyPressed === "Backspace" ? "keycap-pop" : ""
          }`}
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
