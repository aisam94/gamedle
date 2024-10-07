import React from "react";
import Row from "./Row";

const Grid = ({ guesses, currentRow, rowClass, currentSquareIdx }) => {
  return (
    <div className="board-container">
      <div className="board">
        {guesses.map((row, index) => {
          if (index === currentRow) {
            return (
              <Row
                className={rowClass}
                row={row}
                key={index}
                currentSquareIdx={currentSquareIdx}
              />
            );
          }
          return <Row row={row} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
