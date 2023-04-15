import React from "react";

export default function Alert() {
  const alertError = () => {
    Swal.fire("Oops...!", "Ha ocurido un error", "error");
  };
  return <>{alertError}</>;
}
