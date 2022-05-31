import React, { useState, useContext, createContext } from "react";

export const themes = {
  dark: {
    color: "white",
    background: "#0e0e10",
  },
  light: {
    color: "black",
    background: "white",
  },
};

const initialState = {
  theme: themes.light,
  setTheme: () => {},
};

const ThemeContext = createContext(initialState);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//custom hook
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;
