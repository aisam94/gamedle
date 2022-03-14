import React, { useState, useEffect } from "react";

//should import these instead;
const MAX_WORD_LENGTH = 5;
const MAX_TRIES = 6;
let triesLeft = MAX_TRIES;

const GameContainer = () => {
  const [currentGuess, setCurrentGuess] = useState("");

  const squares = [];
  for (let i = 0; i < MAX_TRIES; i++) {
    for (let x = 0; x < MAX_WORD_LENGTH; x++) {
      squares.push("");
    }
  }
  const [guesses, setGuesses] = useState(squares);

  const changeGuess = (text, triesLeft) => {
    const num = (MAX_TRIES - triesLeft) * MAX_WORD_LENGTH;
    for (let i = 0; i < MAX_WORD_LENGTH; i++) {
      guesses[i + num] = "";
    }
    for (let i = 0; i < text.length; i++) {
      guesses[i + num] = text[i];
    }
    setGuesses(guesses);
  };

  const onChar = (text) => {
    const newText = `${currentGuess}${text}`;
    if (newText.length <= MAX_WORD_LENGTH && triesLeft > 0) {
      setCurrentGuess(newText);
      // changeGuess(newText, triesLeft);
    }
  };

  const onDelete = () => {
    const newText = currentGuess.slice(0, currentGuess.length - 1);
    setCurrentGuess(newText);
  };

  const onEnter = () => {
    if (currentGuess.length === MAX_WORD_LENGTH && triesLeft > 0) {
      triesLeft--;
      setCurrentGuess("");
    }
    return;
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  useEffect(() => {
    changeGuess(currentGuess, triesLeft);
    console.log({ currentGuess, guesses });
  }, [currentGuess]);

  return (
    <div className="board-container">
      <div className="board">
        {guesses.map((square, index) => {
          return (
            <div className="square" key={index}>
              {square}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameContainer;
