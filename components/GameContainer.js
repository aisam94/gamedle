import React from "react";

const GameContainer = () => {
  const squares = [];
  for (let i = 0; i < 30; i++) {
    squares.push("");
  }

  return (
    <div class="board-container">
      <div class="board">
        {/* create 5 * 6 squares */}
        <div class="square">A</div>
        <div class="square">D</div>
        <div class="square">I</div>
        <div class="square">E</div>
        <div class="square">U</div>

        {squares.map((square) => {
          return <div class="square"></div>;
        })}
      </div>
    </div>
  );
};

export default GameContainer;
