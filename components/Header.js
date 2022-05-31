import React from "react";
import useTheme, { themes } from "../styles/theme";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <header>
      <h1 className="title" style={theme}>
        GAMEDLE
      </h1>
      <button className="theme-btn btn" onClick={toggleTheme}>
        Toggle dark / light
      </button>
    </header>
  );
};

export default Header;
