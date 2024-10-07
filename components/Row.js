import React from "react";
import Square from "./Square";

const Row = ({ row, className, currentSquareIdx }) => {
  return (
    <div className={`row ${className}`}>
      {row.map((square, index) => {
        {
          if (index === currentSquareIdx) {
            return (
              <Square
                value={square.value}
                color={square.color}
                key={index}
                squareClass={`cell-fill-animation`}
              />
            );
          }
        }
        return <Square value={square.value} color={square.color} key={index} />;
      })}
    </div>
  );
};

export default Row;
