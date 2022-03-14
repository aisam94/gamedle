import React, { useState, useEffect } from "react";
import GameContainer from "../components/GameContainer";
import Header from "../components/Header";
import Keyboard from "../components/Keyboard";
import { MAX_WORD_LENGTH, MAX_TRIES } from "../constants/settings";
import { answer, isWinningWord, isWordInList } from "../lib/words";

let triesLeft = MAX_TRIES;

const HomePage = () => {
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
    }
  };

  const onDelete = () => {
    const newText = currentGuess.slice(0, currentGuess.length - 1);
    setCurrentGuess(newText);
  };

  const onEnter = () => {
    //if not enough letters
    //if win
    //if wrong word
    //if lose game
    //if not proper word
    if (currentGuess.length === MAX_WORD_LENGTH && isWordInList(currentGuess)) {
      triesLeft--;
      setCurrentGuess("");
      if (isWinningWord(currentGuess)) {
        console.log("YOU WIN");
        return;
      }
      if (!triesLeft) {
        console.log("You lose, good day sir!");
        return;
      }
      console.log("Wrong word");
    } else if (currentGuess.length < MAX_WORD_LENGTH) {
      console.log("not enough letter");
    } else if (!isWordInList(currentGuess)) {
      console.log("Not a proper word");
    }
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" && triesLeft) {
        onEnter();
      } else if (e.code === "Backspace" && triesLeft) {
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
    console.log({ currentGuess, guesses, answer });
  }, [currentGuess]);

  return (
    <div id="container">
      <Header />
      <div id="game">
        <GameContainer guesses={guesses} />
        <Keyboard onChar={onChar} />
      </div>
    </div>
  );
};

export default HomePage;
