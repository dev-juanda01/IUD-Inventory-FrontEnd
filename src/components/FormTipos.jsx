import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

const initialForm = {
  id: null,
  nombre: "default",
  estado: "default",
  fechaCreacion: "", // dayjs(new Date().toISOString()).format("YYYY-MM-DD")
  fechaActualizacion: "", //dayjs(new Date().toISOString()).format("YYYY-MM-DD")
};

export default function FormTipos({
  createType,
  updateType,
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

    if (form.nombre === "default" || form.estado === "default")
      return alert("Datos incompletos");

    if (form.id === null) {
      createType(form);
    } else {
      updateType(form);
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
          <select
            className="form-select"
            aria-label="Default select example"
            value={form.nombre}
            name="nombre"
            onChange={handleChange}
            ref={$nombre}
          >
            <option value="default" disabled>
              Selecciona un tipo
            </option>
            <option value="COMPUTO">Computo</option>
            <option value="MOVILES">Moviles</option>
          </select>
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
