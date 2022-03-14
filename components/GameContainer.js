import React, { useState, useEffect } from "react";

const GameContainer = ({ guesses }) => {
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
