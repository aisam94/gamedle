import React from "react";

const Square = ({ value, color }) => {
  return <div className={`square square-${color}`}>{value}</div>;
};

export default Square;
