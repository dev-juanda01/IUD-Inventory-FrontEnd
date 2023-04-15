import dayjs from "dayjs";
import React from "react";

export default function Card({ el, setDataToEdit, deleteInventory }) {
  const {
    serial,
    modelo,
    descripcion,
    foto,
    color,
    fechaCompra,
    precio,
    tipo,
    estado,
    marca,
    usuario,
  } = el;

  return (
    <div className="col">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={foto} className="img-fluid rounded-start" alt={modelo} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{modelo}</h5>
              <p className="card-text">{descripcion}</p>
              <p className="card-text">
                <b>Serial: </b>
                {serial}
              </p>
              <p className="card-text">
                <b>Color: </b> {color}
              </p>
              <p className="card-text">
                <b>Precio: $</b> {precio}
              </p>
              <p className="card-text">
                <b>Tipo: </b> {tipo.nombre}
              </p>
              <p className="card-text">
                <b>Estado: </b> {estado.nombre}
              </p>
              <p className="card-text">
                <b>Marca: </b> {marca.nombre}
              </p>
              <p className="card-text">
                <b>Usuario: </b> {usuario.nombre}
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  fecha de compra {dayjs(fechaCompra).format("YYYY-MM-DD")}
                </small>
              </p>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Opciones
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item edit"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => setDataToEdit(el)}
                    >
                      Editar
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item delete"
                      onClick={() => deleteInventory(el._id)}
                    >
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
