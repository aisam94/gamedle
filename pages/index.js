import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Grid from "../components/Grid";
import Keyboard from "../components/Keyboard";
import { MAX_WORD_LENGTH, MAX_TRIES } from "../constants/settings";
import { answer, isWinningWord, isWordInList } from "../lib/words";
import Alert from "../components/Alert";
import useTheme from "../styles/theme";
import GuessWordContainer from "../components/GuessWordContainer";

let triesLeft = MAX_TRIES;

const HomePage = () => {
	const { theme } = useTheme();

	return (
		<main id="container" style={theme}>
			<Header />
			<GuessWordContainer/>
		</main>
	);
};

export default HomePage;