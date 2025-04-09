import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

// Custom hook to use the theme context
export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [getemail, setemaill] = useState("");

  const theme = {
    setemaill,
    getemail,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
