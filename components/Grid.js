import React from "react";
import Row from "./Row";

const Grid = ({ guessList, currentRowIdx, rowStyleClass, currentSquareIdx }) => {
  return (
    <div className="board-container">
      <div className="board">
        {guessList.map((row, index) => {
          if (index === currentRowIdx) {
            return (
              <Row
                className={rowStyleClass}
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
