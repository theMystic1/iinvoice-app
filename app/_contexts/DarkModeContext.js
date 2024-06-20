"use client";

import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../_lib/hooks/useLocalStorage";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("bg-darkMode-primary");
        document.documentElement.classList.add("text-lightMode-primary");

        document.documentElement.classList.remove("bg-lightMode-primary");
        document.documentElement.classList.remove("text-lightMode-secondary");
      } else {
        document.documentElement.classList.add("bg-lightMode-primary");
        document.documentElement.classList.add("text-lightMode-secondary");

        document.documentElement.classList.remove("bg-darkMode-primary");
        document.documentElement.classList.remove("text-lightMode-primary");
      }
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isd) => !isd);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
