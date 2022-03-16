import React from "react";
import Row from "./Row";

const Grid = ({ guesses }) => {
  return (
    <div className="board-container">
      <div className="board">
        {guesses.map((row, index) => {
          return <Row row={row} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
