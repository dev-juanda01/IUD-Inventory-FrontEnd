import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

const initialForm = {
  id: null,
  nombre: "",
  email: "",
  estado: "default",
  fechaCreacion: "",
  fechaActualizacion: "",
};

export default function FormUsuarios({
  createUser,
  updateUser,
  dataToEdit,
  setDataToEdit,
}) {
  const [form, setForm] = useState(initialForm);
  const $nombre = useRef(null);

  useEffect(() => {
    if (dataToEdit) {
      $nombre.current.disabled = true;

      dataToEdit.fechaCreacion = dayjs(dataToEdit.fechaCreacion).format(
        "YYYY-MM-DD"
      );
      dataToEdit.fechaActualizacion = dayjs(
        dataToEdit.fechaActualizacion
      ).format("YYYY-MM-DD");

      setForm(dataToEdit);
    } else {
      $nombre.current.disabled = false;
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || form.estado === "default" || !form.email)
      return alert("Datos incompletos");

    if (form.id === null) {
      createUser(form);
    } else {
      updateUser(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Escribe el nombre"
            aria-label="default input example"
            name="nombre"
            ref={$nombre}
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="nombre" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            placeholder="Escribe el email"
            aria-label="default input example"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="estado" className="form-label">
            Estado
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={form.estado}
            name="estado"
            onChange={handleChange}
          >
            <option value="default" disabled>
              Selecciona un estado
            </option>
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="fecha-creacion" className="form-label">
            Fecha de Creación
          </label>
          <input
            type="date"
            className="form-control"
            id="fecha-creacion"
            name="fechaCreacion"
            disabled
            value={form.fechaCreacion}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="fecha-actualizacion" className="form-label">
            Fecha de Actualización
          </label>
          <input
            type="date"
            className="form-control"
            id="fecha-actualizacion"
            disabled
            value={form.fechaActualizacion}
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Limpiar
          </button>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
    </>
  );
}
