import React from "react";
import GameContainer from "../components/GameContainer";
import Keyboard from "../components/Keyboard";

const HomePage = () => {
  return (
    <div id="container">
      <div id="game">
        <header>
          <h1 class="title">WORDLE</h1>
        </header>
        <GameContainer />
        <Keyboard />
      </div>
    </div>
  );
};

export default HomePage;
