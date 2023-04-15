import React, { useState } from "react";

export default function FormSearch({ ph, listModule }) {
  const [nombre, setNombre] = useState("");

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    listModule(nombre);
  };

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder={ph}
          aria-label="Search"
          value={nombre}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Buscar
        </button>
      </form>
    </>
  );
}
