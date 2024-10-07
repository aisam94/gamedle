import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";
import { MAX_WORD_LENGTH, MAX_TRIES } from "../constants/settings";
import { answer, isWinningWord, isWordInList } from "../lib/words";
import Alert from "../components/Alert";
import useTheme from "../styles/theme";

let triesLeft = MAX_TRIES;

const HomePage = () => {
	const { theme } = useTheme();

	const [currentGuess, setCurrentGuess] = useState("");
	const [isGameOver, setGameOver] = useState(false);
	const [letterStatus, setLetterStatus] = useState({
		usedLetters: [],
		misplacedLetters: [],
		correctLetters: [],
	});
	const { usedLetters, misplacedLetters, correctLetters } = letterStatus;
	const [rowClass, setRowClass] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const [rerender, setRerender] = useState(false);

	let currentRow = isGameOver
		? MAX_TRIES - triesLeft - 1
		: MAX_TRIES - triesLeft;
	let currentSquare = currentGuess.length - 1;

	const squares = [];
	for (let i = 0;i < MAX_TRIES;i++) {
		squares.push([]);
		for (let x = 0;x < MAX_WORD_LENGTH;x++) {
			squares[i].push({ color: "", value: "" });
		}
	}
	const [guesses, setGuesses] = useState(squares);

	const changeGuess = (text) => {
		const currentRow = MAX_TRIES - triesLeft;
		if (triesLeft) {
			for (let i = 0;i < MAX_WORD_LENGTH;i++) {
				guesses[currentRow][i].value = "";
			}
			for (let i = 0;i < text.length;i++) {
				guesses[currentRow][i].value = text[i];
			}
			setGuesses(guesses);
		}
	};

	const onChar = (text) => {
		const newText = `${currentGuess}${text}`;
		if (newText.length <= MAX_WORD_LENGTH && !isGameOver) {
			setCurrentGuess(newText);
		}
	};

	const onDelete = () => {
		const newText = currentGuess.slice(0, currentGuess.length - 1);
		setCurrentGuess(newText);
	};

	const onEnter = () => {
		let ansCopy = answer; // to check for duplicates letters
		const currentRow = MAX_TRIES - triesLeft;
		if (currentGuess.length === MAX_WORD_LENGTH && isWordInList(currentGuess)) {
			//valid guess
			//iterate word and perform checks
			for (let guessIdx = 0;guessIdx < MAX_WORD_LENGTH;guessIdx++) {
				if (currentGuess[guessIdx] === answer[guessIdx]) {
					//if correct word
					guesses[currentRow][guessIdx].color = "green";
					correctLetters.push(guesses[currentRow][guessIdx].value);
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
							guesses[currentRow][guessIdx].color = "yellow";
							misplacedLetters.push(guesses[currentRow][guessIdx].value);
							setLetterStatus({
								...letterStatus,
								misplacedLetters: misplacedLetters,
							});
							break;
						}
						guesses[currentRow][guessIdx].color = "gray";
						usedLetters.push(guesses[currentRow][guessIdx].value);
						setLetterStatus({ ...letterStatus, usedLetters: usedLetters });
					}
					ansCopy = ansCopy.replace(currentGuess[guessIdx], "");
				} else {
					//else will be wrong and greyed out
					guesses[currentRow][guessIdx].color = "gray";
					usedLetters.push(guesses[currentRow][guessIdx].value);
					setLetterStatus({ ...letterStatus, usedLetters: usedLetters });
				}
			}
			setGuesses(guesses);
			//
			triesLeft--;
			setCurrentGuess("");
			if (isWinningWord(currentGuess)) {
				setGameOver(true);
				setRowClass("dancing-up");
				setAlertMessage("YOU WIN !!!");
				return;
			}
			if (!triesLeft) {
				setGameOver(true);
				setAlertMessage(`YOU LOSE, GOOD DAY SIR !THE WORD IS ${answer}`);
				return;
			}
			setAlertMessage("TRY AGAIN ...");
		} else if (currentGuess.length < MAX_WORD_LENGTH) {
			setRowClass("shake-x");
			setAlertMessage("NOT ENOUGH LETTERS");
		} else if (!isWordInList(currentGuess)) {
			setAlertMessage("WORD IS NOT IN OUR LIST");
			setRowClass("shake-x");
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
						onChar(key);
					}
				}
			}
		};
		window.addEventListener("keyup", listener);
		return () => {
			window.removeEventListener("keyup", listener);
		};
	}, [onEnter, onDelete, onChar]);

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
				setRowClass("");
			}, 500);
		}

		return () => clearTimeout(timer);
	}, [rowClass, currentGuess]);

	return (
		<main id="container" style={theme}>
			<Header />
			<Alert alertMessage={alertMessage} />
			<div id="game">
				<Grid
					guesses={guesses}
					currentRow={currentRow}
					currentSquare={currentSquare}
					rowClass={rowClass}
				/>
				<Keyboard
					onChar={onChar}
					onEnter={onEnter}
					onDelete={onDelete}
					letterStatus={letterStatus}
				/>
			</div>
		</main>
	);
};

export default HomePage;
