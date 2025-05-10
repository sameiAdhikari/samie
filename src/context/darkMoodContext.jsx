import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
// import { useState } from "react";

const DarkmoodContext = createContext();

function DarkmoodProvider({ children }) {
  const defaultDarkMood = window.matchMedia(
    "(prefers-color-schema:dark"
  ).matches;
  const [isDarkmood, setIsDarkmood] = useLocalStorageState(
    defaultDarkMood,
    "darkMood"
  );
  function toggleDarkmood() {
    setIsDarkmood((isDarkmood) => !isDarkmood);
  }

  useEffect(
    function () {
      if (isDarkmood) {
        document.documentElement.classList.add("dark-mood");
        document.documentElement.classList.remove("light-mood");
      } else {
        document.documentElement.classList.remove("dark-mood");
        document.documentElement.classList.add("light-mood");
      }
    },
    [isDarkmood]
  );

  return (
    <DarkmoodContext.Provider value={{ isDarkmood, toggleDarkmood }}>
      {" "}
      {children}
    </DarkmoodContext.Provider>
  );
}

function useDarkmood() {
  const context = useContext(DarkmoodContext);
  if (context === undefined)
    throw new Error("context is use outside of provider");
  return context;
}

export { DarkmoodProvider, useDarkmood };
