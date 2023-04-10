import React, { useRef } from "react";

export default function OpenCanvas() {
  const $hamburger = useRef();

  const handleClick = (e) => {
    $hamburger.current.classList.add("is-active");
  };

  return (
    <button
      className="hamburger hamburger--vortex btn btn-light btn-open"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#staticBackdrop"
      aria-controls="staticBackdrop"
      ref={$hamburger}
      onClick={handleClick}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
}
