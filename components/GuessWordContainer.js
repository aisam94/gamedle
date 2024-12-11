import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import { MAX_WORD_LENGTH, MAX_TRIES } from "../constants/settings";
import { getGameWord, isWordInList } from "../lib/words";
import Alert from "./Alert";

let triesLeft = MAX_TRIES;

const GuessWordContainer = () => {
    const [currentGuess, setCurrentGuess] = useState("");
    const [isGameOver, setGameOver] = useState(false);
    const [letterStatus, setLetterStatus] = useState({
        usedLetters: [],
        misplacedLetters: [],
        correctLetters: [],
    });
    const { usedLetters, misplacedLetters, correctLetters } = letterStatus;
    const [rowStyleClass, setRowStyleClass] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [rerender, setRerender] = useState(false);
    const [answer, setAnswer] = useState(getGameWord().answer);

    let currentRowIdx = isGameOver
        ? MAX_TRIES - triesLeft - 1
        : MAX_TRIES - triesLeft;
    let currentSquareIdx = currentGuess.length - 1;

    const getNewSquares = () => {
        const squares = [];
        for (let i = 0;i < MAX_TRIES;i++) {
            squares.push([]);
            for (let x = 0;x < MAX_WORD_LENGTH;x++) {
                squares[i].push({ color: "", value: "" });
            }
        }
        return squares;
    }

    const [guessList, setGuessList] = useState(getNewSquares());

    const changeGuess = (text) => {
        const currentRowIdx = MAX_TRIES - triesLeft;
        if (triesLeft) {
            for (let i = 0;i < MAX_WORD_LENGTH;i++) {
                guessList[currentRowIdx][i].value = "";
                guessList[currentRowIdx][i].color = "";
            }
            for (let i = 0;i < text.length;i++) {
                guessList[currentRowIdx][i].value = text[i];
                if (usedLetters.includes(text[i]) && !misplacedLetters.includes(text[i])) {
                    guessList[currentRowIdx][i].color = "light-gray";
                }
            }
            setGuessList(guessList);
        }
    };

    const onCharInput = (text) => {
        const newText = `${currentGuess}${text}`;
        if (newText.length <= MAX_WORD_LENGTH && !isGameOver) {
            setCurrentGuess(newText);
        }
    };

    const onDelete = () => {
        const newText = currentGuess.slice(0, currentGuess.length - 1);
        setCurrentGuess(newText);
    };

    const onRefresh = () => {
        setCurrentGuess("");
        setGameOver(false);
        setLetterStatus({
            usedLetters: [],
            misplacedLetters: [],
            correctLetters: [],
        });

        usedLetters = [];
        misplacedLetters = [];
        correctLetters = [];

        setRowStyleClass("");
        setAlertMessage("");
        setRerender(false);

        triesLeft = MAX_TRIES;
        currentRowIdx = 0;
        currentSquareIdx = 0;
        setGuessList(getNewSquares());
        setAnswer(getGameWord().answer);
    }

    const onEnter = () => {
        let ansCopy = answer; // to check for duplicates letters
        const currentRowIdx = MAX_TRIES - triesLeft;
        if (currentGuess.length === MAX_WORD_LENGTH && isWordInList(currentGuess)) {
            //valid guess
            //iterate word and perform checks
            for (let guessIdx = 0;guessIdx < MAX_WORD_LENGTH;guessIdx++) {
                if (currentGuess[guessIdx] === answer[guessIdx]) {
                    //if correct word
                    guessList[currentRowIdx][guessIdx].color = "green";
                    correctLetters.push(guessList[currentRowIdx][guessIdx].value);
                    setLetterStatus({
                        ...letterStatus,
                        correctLetters: correctLetters,
                    });
                    ansCopy = ansCopy.replace(currentGuess[guessIdx], "");
                } else if (ansCopy.includes(currentGuess[guessIdx])) {
                    //misplaced words
                    for (let ansIdx = 0;ansIdx < MAX_WORD_LENGTH;ansIdx++) {
                        if (
                            answer[ansIdx] === currentGuess[guessIdx] &&
                            currentGuess[ansIdx] !== answer[ansIdx] &&
                            ansIdx !== guessIdx
                        ) {
                            guessList[currentRowIdx][guessIdx].color = "yellow";
                            misplacedLetters.push(guessList[currentRowIdx][guessIdx].value);
                            setLetterStatus({
                                ...letterStatus,
                                misplacedLetters: misplacedLetters,
                            });
                            break;
                        }
                        guessList[currentRowIdx][guessIdx].color = "gray";
                        usedLetters.push(guessList[currentRowIdx][guessIdx].value);
                        setLetterStatus({ ...letterStatus, usedLetters: usedLetters });
                    }
                    ansCopy = ansCopy.replace(currentGuess[guessIdx], "");
                } else {
                    //else will be wrong and greyed out
                    guessList[currentRowIdx][guessIdx].color = "gray";
                    usedLetters.push(guessList[currentRowIdx][guessIdx].value);
                    setLetterStatus({ ...letterStatus, usedLetters: usedLetters });
                }
            }
            setGuessList(guessList);
            //
            triesLeft--;
            setCurrentGuess("");
            if (currentGuess == answer) {
                setGameOver(true);
                setRowStyleClass("dancing-up");
                setAlertMessage("You win !!!");
                return;
            }
            if (!triesLeft) {
                setGameOver(true);
                setAlertMessage(`You lose, good day sir! The word is ${answer}`);
                return;
            }
            setAlertMessage("Try again...");
        } else if (currentGuess.length < MAX_WORD_LENGTH) {
            setRowStyleClass("shake-x");
            setAlertMessage("Not enough letters");
        } else if (!isWordInList(currentGuess)) {
            setAlertMessage("Word is not in our list");
            setRowStyleClass("shake-x");
        }
    };

    useEffect(() => {
        const listener = (e) => {
            if (!isGameOver) {
                if (e.code === "Enter") {
                    onEnter();
                } else if (e.code === "Backspace") {
                    onDelete();
                } else {
                    const key = e.key.toUpperCase();
                    if (key.length === 1 && key >= "A" && key <= "Z") {
                        onCharInput(key);
                    }
                }
            }
        };
        window.addEventListener("keyup", listener);
        return () => {
            window.removeEventListener("keyup", listener);
        };
    }, [onEnter, onDelete, onCharInput]);

    useEffect(() => {
        if (!isGameOver) {
            changeGuess(currentGuess);
        }
    }, [currentGuess]);

    //makeshift rerender
    //rerender using timeout after jiggle
    useEffect(() => {
        setRerender(!rerender);
        if (!isGameOver) {
            const timer = setTimeout(() => {
                setRowStyleClass("");
            }, 500);
        }

        return () => clearTimeout(timer);
    }, [rowStyleClass, currentGuess]);

    return (
        <div>
            <Alert alertMessage={alertMessage} refresh={onRefresh}/>
            <div id="game">
                <Grid
                    guessList={guessList}
                    currentRowIdx={currentRowIdx}
                    currentSquareIdx={currentSquareIdx}
                    rowStyleClass={rowStyleClass}
                />
                <Keyboard
                    onCharInput={onCharInput}
                    onEnter={onEnter}
                    onDelete={onDelete}
                    letterStatus={letterStatus}
                />
            </div>
        </div>
    );
};

export default GuessWordContainer;