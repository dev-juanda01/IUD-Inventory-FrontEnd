import React, { useState } from "react";

export default function FormSearch({ listType }) {
  const [nombre, setNombre] = useState("");

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    listType(nombre);
  };

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar tipo"
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
