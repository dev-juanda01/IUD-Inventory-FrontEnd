import React, { useState, useEffect } from "react";
import { getDocs, postDoc, putDoc, deleteDoc } from "../services/useAxiosHelp";
import ButtonAgregar from "./ButtonAgregar";
import FormSearch from "./FormSearch";
import Logo from "./Logo";
import ModalGlobal from "./ModalGlobal";
import Table from "./Table";

export default function Marcas() {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);

  const enpoint = "marcaequipos";

  const listMarke = async () => {
    try {
      let res = await getDocs(enpoint);
      let json = await res.data;
      setData(json);

      console.log("marcas", data);
      console.log(json);
    } catch (error) {}
  };

  const createMarke = async (datos) => {
    try {
      delete datos.nombre;
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.marca = datos.marca === "true" ? true : false;

      const res = await postDoc(enpoint, datos);
      setData([...data, res.data.nuevoMarcaEquipo]);
      alert("Marca creada correctamente");

      console.log(data, res);
    } catch (error) {
      let { response } = error;
      if (!response.status) return;
      response.status == 409 && alert(response.data.message);
      console.log(error);
    }
  };

  const updateMarke = async (datos) => {
    try {
      console.log(datos);
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.marca = datos.marca === "true" ? true : false;

      const res = await putDoc(enpoint, datos);
      let markeUpdate = res.data.findMarcaEquipo;

      const dataUpdate = data.map((el) =>
        el._nombre === markeUpdate._nombre ? markeUpdate : el
      );
      setData(dataUpdate);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMarke = async (nombre) => {
    try {
      console.log(nombre);
      const isDelete = confirm("¿Estas seguro de eliminar esta marca?");

      if (isDelete) {
        const res = await deleteDoc(enpoint, nombre);
        setData(data.filter((el) => el._nombre !== nombre));
        console.log("nueva data", data);
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listMarke();
    console.log(data);
  }, [enpoint]);

  return (
    <>
      <Logo />
      <div>
        <h2> Marcas de equipos</h2>
        <div className="header-types">
          <ButtonAgregar />
          <FormSearch />
        </div>
        {data && (
          <Table
            datos={data}
            setDataToEdit={setDataToEdit}
            deleteMark={deleteMarke}
          />
        )}
        <ModalGlobal
          createMarke={createMarke}
          updateMarke={updateMarke}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </>
  );
}
