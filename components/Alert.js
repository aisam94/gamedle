import React from "react";

const Alert = ({ alertMessage, refresh }) => {
  return <div className="guess-name-alert">
    <button className="refresh-button theme-btn btn" onClick={refresh}>
      Refresh word
    </button>
    <div className="alert">{alertMessage}</div>
  </div>
};

export default Alert;