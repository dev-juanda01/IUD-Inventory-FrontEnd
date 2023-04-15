import dayjs from "dayjs";
import React, { useState, useEffect, useRef } from "react";

const initialForm = {
  id: null,
  serial: "",
  modelo: "",
  descripcion: "",
  foto: "",
  color: "",
  fechaCompra: "",
  precio: 0,
  usuario: "default",
  marca: "default",
  estado: "default",
  tipo: "default",
};

export default function FormInventario({
  data,
  createInventory,
  updateInventory,
  dataToEdit,
  setDataToEdit,
  dataModules,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      dataToEdit.fechaCompra = dayjs(dataToEdit.fechaCompra).format(
        "YYYY-MM-DD"
      );

      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.tipo === "default" ||
      form.usuario === "default" ||
      form.marca === "default" ||
      form.estado === "default"
    ) {
      return alert("Datos incompletos");
    }

    if (form.id === null) {
      createInventory(form);
    } else {
      updateInventory(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  let tipoActivos, estadoActivos, marcaActivos, usuarioActivos;

  if (dataModules) {
    tipoActivos = dataModules[0].filter((el) => el.estado === true);
    estadoActivos = dataModules[1].filter((el) => el.estado === true);
    marcaActivos = dataModules[2].filter((el) => el.estado === true);
    usuarioActivos = dataModules[3].filter((el) => el.estado === true);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row-input">
          <div>
            <label htmlFor="serial" className="form-label">
              Serial
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Escribe el serial"
              aria-label="default input example"
              name="serial"
              value={form.serial}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="modelo" className="form-label">
              Modelo
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Escribe el modelo"
              aria-label="default input example"
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            aria-label="With textarea"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <br />
        <div>
          <label htmlFor="foto" className="form-label">
            Foto
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Escribe la url de la foto"
            aria-label="default input example"
            name="foto"
            value={form.foto}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="row-input">
          <div>
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Escribe el nombre del color"
              aria-label="default input example"
              name="color"
              value={form.color}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="precio" className="form-label">
              Precio
            </label>
            <input
              className="form-control"
              type="number"
              placeholder="Escribe el precio"
              aria-label="default input example"
              name="precio"
              value={form.precio}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="fecha-compra" className="form-label">
            Fecha de Compra
          </label>
          <input
            type="date"
            className="form-control"
            id="fecha-compra"
            name="fechaCompra"
            value={form.fechaCompra}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="row-input">
          <div>
            <label htmlFor="nombre" className="form-label">
              Tipo
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
            >
              <option value="default" disabled>
                Selecciona un tipo
              </option>
              {tipoActivos &&
                tipoActivos.map((el, index) => (
                  <option key={index} value={el.id}>
                    {el.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="nombre" className="form-label">
              Estado
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="estado"
              value={form.estado}
              onChange={handleChange}
            >
              <option value="default" disabled>
                Selecciona un estado
              </option>
              {estadoActivos &&
                estadoActivos.map((el, index) => (
                  <option key={index} value={el.id}>
                    {el.nombre}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="nombre" className="form-label">
            Marca
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="marca"
            value={form.marca}
            onChange={handleChange}
          >
            <option value="default" disabled>
              Selecciona una marca
            </option>
            {marcaActivos &&
              marcaActivos.map((el, index) => (
                <option key={index} value={el.id}>
                  {el.nombre}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="nombre" className="form-label">
            Usuario
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
          >
            <option value="default" disabled>
              Selecciona un usuario
            </option>
            {usuarioActivos &&
              usuarioActivos.map((el, index) => (
                <option key={index} value={el.id}>
                  {el.nombre}
                </option>
              ))}
          </select>
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
