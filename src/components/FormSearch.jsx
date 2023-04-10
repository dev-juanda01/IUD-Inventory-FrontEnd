import React from "react";

export default function FormSearch() {
  return (
    <>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar tipo"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Buscar
        </button>
      </form>
    </>
  );
}
