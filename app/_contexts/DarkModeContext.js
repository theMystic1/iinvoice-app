"use client";

import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../_lib/hooks/useLocalStorage";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;

      if (isDarkMode) {
        root.classList.add("bg-darkMode-primary", "text-lightMode-primary");
        root.classList.remove(
          "bg-lightMode-primary",
          "text-lightMode-secondary"
        );
      } else {
        root.classList.add("bg-lightMode-primary", "text-lightMode-secondary");
        root.classList.remove("bg-darkMode-primary", "text-lightMode-primary");
      }
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prevMode) => !prevMode);
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
