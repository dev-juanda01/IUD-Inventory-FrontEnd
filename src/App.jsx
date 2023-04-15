import React, { useState, useEffect } from "react";
import Spinnerloader from "./components/Spinnerloader";
import AppRouter from "./router/AppRouter";

const ls = localStorage;

function App() {
  const [isLoading, setisLoading] = useState(true);
  const [theme, setTheme] = useState(ls.getItem("theme"));

  const $html = document.documentElement,
    $linksCanvas = document.querySelectorAll(".link-canvas");

  const lightMode = () => {
    $html.removeAttribute("data-bs-theme", "dark");
    $linksCanvas.forEach((el) => (el.style.color = "#000"));
    ls.setItem("theme", "light");
    setTheme(ls.getItem("theme"));
  };

  const darkMode = () => {
    $html.setAttribute("data-bs-theme", "dark");
    $linksCanvas.forEach((el) => (el.style.color = "#fff"));
    ls.setItem("theme", "dark");
    setTheme(ls.getItem("theme"));
  };

  useEffect(() => {
    if (ls.getItem("theme") === null) ls.setItem("theme", "light");

    if (ls.getItem("theme") === "light") {
      lightMode();
    }

    if (ls.getItem("theme") === "dark") {
      darkMode();
    }

    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinnerloader />
      ) : (
        <AppRouter
          darkMode={darkMode}
          lightMode={lightMode}
          theme={theme}
          setTheme={setTheme}
        />
      )}
    </>
  );
}

export default App;
