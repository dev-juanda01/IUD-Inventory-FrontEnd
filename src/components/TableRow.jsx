import dayjs from "dayjs";
import React from "react";

export default function TableRow({ id, el, setDataToEdit, deleteType }) {
  let { nombre, estado, email, fechaCreacion, fechaActualizacion } = el;

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{nombre}</td>
      <td>{estado ? "Activo" : "Inactivo"}</td>
      {email && <td>{email}</td>}
      <td>{dayjs(fechaCreacion).format("YYYY-MM-DD")}</td>
      <td>{dayjs(fechaActualizacion).format("YYYY-MM-DD")}</td>
      <td className="btn-options">
        <button
          type="button"
          className="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ marginRight: ".5rem" }}
          onClick={() => setDataToEdit(el)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => deleteType(el._id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
