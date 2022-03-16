import React from "react";
import Square from "./Square";

const Row = ({ row }) => {
  return (
    <>
      {row.map((square, index) => {
        return <Square value={square.value} color={square.color} key={index} />;
      })}
    </>
  );
};

export default Row;
