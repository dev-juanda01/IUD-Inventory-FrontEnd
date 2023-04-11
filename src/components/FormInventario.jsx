import React from "react";

export default function FormInventario({ data }) {
  // console.log(data);
  return (
    <>
      <form /*onSubmit={handleSubmit}*/>
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
          />
        </div>
        <br />
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
          />
        </div>
        <br />
        <div>
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            aria-label="With textarea"
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
          />
        </div>
        <br />
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
          />
        </div>
        <br />
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
          />
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
            // value={form.fechaActualizacion}
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            // onClick={handleReset}
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
