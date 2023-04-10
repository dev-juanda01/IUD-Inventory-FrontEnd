import React, { useState } from "react";
import DarkMode from "./DarkMode";
import LightMode from "./LightMode";

export default function ColorPage() {
  const [mode, setMode] = useState(false);

  const $html = document.documentElement,
    $linksCanvas = document.querySelectorAll(".link-canvas");

  if (mode) {
    $html.setAttribute("data-bs-theme", "dark");
    $linksCanvas.forEach((el) => (el.style.color = "#fff"));
  } else {
    $html.removeAttribute("data-bs-theme", "dark");
    $linksCanvas.forEach((el) => (el.style.color = "#000"));
  }

  const handleClickMode = (e) => {
    setMode(!mode);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-light btn-mode"
        onClick={handleClickMode}
      >
        {mode ? <LightMode /> : <DarkMode />}
      </button>
    </>
  );
}
