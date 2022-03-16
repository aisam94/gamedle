import React from "react";

const Square = ({ value, color }) => {
  return (
    <div className="square" style={{ backgroundColor: `${color}` }}>
      {value}
    </div>
  );
};

export default Square;
