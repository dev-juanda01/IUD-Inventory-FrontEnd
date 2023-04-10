import React from "react";

export default function Spinnerloader() {
  const styleSpinner = {
    height: "100vh",
    fontSize: "5rem",
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={styleSpinner}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
