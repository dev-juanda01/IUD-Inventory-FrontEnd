import React from "react";
import Card from "./Card";

export default function CardGroup({
  data,
  setDataToEdit,
  deleteInventory,
  dataModules,
}) {
  if (dataModules) {
    data.map((inv) => {
      dataModules[0].forEach((el) => {
        inv.tipo = inv.tipo === el.id ? el : inv.tipo;
      });

      dataModules[1].forEach((el) => {
        inv.estado = inv.estado === el.id ? el : inv.estado;
      });

      dataModules[2].forEach((el) => {
        inv.marca = inv.marca === el.id ? el : inv.marca;
      });

      dataModules[3].forEach((el) => {
        inv.usuario = inv.usuario === el.id ? el : inv.usuario;
      });
    });
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4 cards-group">
      {data.map((el, index) => (
        <Card
          key={index}
          el={el}
          setDataToEdit={setDataToEdit}
          deleteInventory={deleteInventory}
        />
      ))}
    </div>
  );
}
