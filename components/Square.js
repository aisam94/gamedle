import React from "react";

const Square = ({ value, color, squareClass }) => {
  return <div className={`square ${color} ${squareClass}`}>{value}</div>;
};

export default Square;
