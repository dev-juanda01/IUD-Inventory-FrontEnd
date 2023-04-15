import React, { useEffect, useRef } from "react";
import "./SpinnerRenderUI.css";

export default function SpinnerRenderUI({ theme }) {
  const $spinner = useRef();

  useEffect(() => {
    if (theme === "light") {
      for (const element of $spinner.current.children) {
        element.style.backgroundColor = "#222";
      }
    } else {
      for (const element of $spinner.current.children) {
        element.style.backgroundColor = "#fff";
      }
    }
  }, [theme]);

  return (
    <div className="spinner-render">
      <div className="lds-ellipsis" ref={$spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    // <div className="d-flex justify-content-center">
    //   <div className="spinner-border" role="status">
    //     <span className="visually-hidden">Loading...</span>
    //   </div>
    // </div>
  );
}
