import React, { useState, useEffect } from "react";
import DarkMode from "./DarkMode";
import LightMode from "./LightMode";

export default function ColorPage({ darkMode, lightMode, theme, setTheme }) {
  const [mode, setMode] = useState(false);

  const handleClickMode = (e) => {
    setMode(!mode);
    if (mode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      darkMode();
    } else {
      lightMode();
    }
  }, [mode]);

  return (
    <>
      <button
        type="button"
        className="btn btn-light btn-mode"
        onClick={handleClickMode}
      >
        {theme === "dark" ? <LightMode /> : <DarkMode />}
      </button>
    </>
  );
}
