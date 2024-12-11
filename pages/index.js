import React from "react";
import Header from "../components/Header";
import useTheme from "../styles/theme";
import GuessWordContainer from "../components/GuessWordContainer";

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