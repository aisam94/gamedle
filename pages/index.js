import React, { useState, useEffect } from "react";
import GameContainer from "../components/GameContainer";
import Header from "../components/Header";
import Keyboard from "../components/Keyboard";

const HomePage = () => {
  return (
    <div id="container">
      <Header />
      <div id="game">
        <GameContainer />
        <Keyboard />
      </div>
    </div>
  );
};

export default HomePage;
