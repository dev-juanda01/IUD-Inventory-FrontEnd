import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";

export default function Table({ datos, setDataToEdit, deleteType }) {
  const [hasEmail, setHasEmail] = useState(false);

  const validateHasEmail = () => {
    const keysTypes = Object.keys(datos[0]);
    keysTypes.includes("email") && setHasEmail(true);
  };

  useEffect(() => {
    validateHasEmail();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            {hasEmail && <th scope="col">Email</th>}
            <th scope="col">Fecha de creación</th>
            <th scope="col">Fecha de actualización</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((el, index) => (
            <TableRow
              key={index}
              id={index + 1}
              el={el}
              setDataToEdit={setDataToEdit}
              deleteType={deleteType}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
