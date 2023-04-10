import React from "react";
import ColorBar from "./ColorBar";
import OpenCanvas from "./OpenCanvas";

export default function OffCanvas() {
  const handleClickClose = (e) => {
    const $hamburger = document.querySelector(".hamburger");
    $hamburger.classList.remove("is-active");
  };

  return (
    <>
      <OpenCanvas />
      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <ColorBar />
        <div className="offcanvas-header">
          <div className="container-logo">
            <a href="/">
              <img
                src="logo-website.svg"
                alt="Logo IUD Inventory"
                className="logo-img"
              />
            </a>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleClickClose}
          ></button>
        </div>
        <div className="offcanvas-body body-canvas">
          <a className="link-canvas" href="tipos">
            Tipos de equipos
          </a>
          <a className="link-canvas" href="estados">
            Estado de equipos
          </a>
          <a className="link-canvas" href="marcas">
            Marcas de equipos
          </a>
          <a className="link-canvas" href="usuarios">
            Usuarios
          </a>
          <a className="link-canvas" href="inventarios">
            Inventarios
          </a>
        </div>
      </div>
    </>
  );
}
