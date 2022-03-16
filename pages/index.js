import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";
import { MAX_WORD_LENGTH, MAX_TRIES } from "../constants/settings";
import { answer, isWinningWord, isWordInList } from "../lib/words";

let triesLeft = MAX_TRIES;

const HomePage = () => {
  const [currentGuess, setCurrentGuess] = useState("");

  const squares = [];
  for (let i = 0; i < MAX_TRIES; i++) {
    squares.push([]);
    for (let x = 0; x < MAX_WORD_LENGTH; x++) {
      squares[i].push({ color: "", value: "" });
    }
  }
  const [guesses, setGuesses] = useState(squares);

  const changeGuess = (text) => {
    const currentRow = MAX_TRIES - triesLeft;
    if (triesLeft) {
      for (let i = 0; i < MAX_WORD_LENGTH; i++) {
        guesses[currentRow][i].value = "";
      }
      for (let i = 0; i < text.length; i++) {
        guesses[currentRow][i].value = text[i];
      }
      setGuesses(guesses);
    }
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
    const currentRow = MAX_TRIES - triesLeft;
    if (currentGuess.length === MAX_WORD_LENGTH && isWordInList(currentGuess)) {
      //valid guess
      //fill color array
      for (let i = 0; i < MAX_WORD_LENGTH; i++) {
        if (currentGuess[i] === answer[i]) {
          guesses[currentRow][i].color = "green";
        } else if (answer.includes(currentGuess[i])) {
          guesses[currentRow][i].color = "yellow";
        } else {
          guesses[currentRow][i].color = "gray";
        }
      }
      setGuesses(guesses);
      //
      triesLeft--;
      setCurrentGuess(""); //
      if (isWinningWord(currentGuess)) {
        console.log("YOU WIN");
        return;
      }
      if (!triesLeft) {
        console.log("YOU LOSE, GOOD DAY SIR!");
        return;
      }
      console.log("WRONG WORD");
    } else if (currentGuess.length < MAX_WORD_LENGTH) {
      console.log("NOT ENOUGH LETTER");
    } else if (!isWordInList(currentGuess)) {
      console.log("NOT A PROPER WORD");
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
    if (triesLeft) {
      changeGuess(currentGuess);
      console.log({ currentGuess, guesses, answer });
    }
  }, [currentGuess]);

  //makeshift rerender
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    setRerender(!rerender);
  }, [currentGuess]);

  return (
    <div id="container">
      <Header />
      <div id="game">
        <Grid guesses={guesses} />
        <Keyboard onChar={onChar} />
      </div>
    </div>
  );
};

export default HomePage;
