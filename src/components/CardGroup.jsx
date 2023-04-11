import React from "react";
import Card from "./Card";

export default function CardGroup({ data, setData, dataModules }) {
  if (dataModules) {
    data.map((inv) => {
      dataModules[0].forEach((el) => {
        inv.tipo = inv.tipo === el.id ? el : inv.tipo;
      });

      dataModules[1].forEach((el) => {
        inv.estado = inv.estado === el.id ? el : inv.estado;
      });
    });
  }
  console.log(data, dataModules);
  return (
    <div className="row row-cols-2 row-cols-md-2 g-4 cards">
      {data.map((el, index) => (
        <Card key={index} el={el} />
      ))}
    </div>
  );
}
