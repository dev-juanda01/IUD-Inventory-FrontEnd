import React, { useState, useEffect } from "react";
import { getDoc, postDoc, putDoc, deleteDoc } from "../services/useAxiosHelp";
import ButtonAgregar from "./ButtonAgregar";
import FormSearch from "./FormSearch";
import Logo from "./Logo";
import ModalGlobal from "./ModalGlobal";
import Table from "./Table";

export default function Tipos() {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);

  const enpoint = "tipoequipos";

  const listTypes = async () => {
    try {
      let res = await getDoc(enpoint);
      let json = await res.data;
      setData(json);

      console.log("datos", data);
    } catch (error) {}
  };

  const createType = async (datos) => {
    try {
      delete datos.id;
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await postDoc(enpoint, datos);
      setData([...data, res.data.nuevoTipoEquipo]);
      alert("Tipo creado correctamente");

      console.log(data, res);
    } catch (error) {
      let { response } = error;
      if (!response.status) return;
      response.status == 409 && alert(response.data.message);
      console.log(error);
    }
  };

  const updateType = async (datos) => {
    try {
      console.log(datos);
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await putDoc(enpoint, datos);
      let typeUpdate = res.data.findTipoEquipo;

      const dataUpdate = data.map((el) =>
        el._id === typeUpdate._id ? typeUpdate : el
      );
      setData(dataUpdate);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteType = async (id) => {
    try {
      console.log(id);
      const isDelete = confirm("¿Estas seguro de eliminar este tipo?");

      if (isDelete) {
        const res = await deleteDoc(enpoint, id);
        setData(data.filter((el) => el._id !== id));
        console.log("nueva data", data);
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listTypes();
  }, [enpoint]);

  return (
    <>
      <Logo />
      <div>
        <h2> Tipos de equipos</h2>
        <div className="header-types">
          <ButtonAgregar />
          <FormSearch />
        </div>
        {data && (
          <Table
            datos={data}
            setDataToEdit={setDataToEdit}
            deleteType={deleteType}
          />
        )}
        <ModalGlobal
          createType={createType}
          updateType={updateType}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </>
  );
}

// codigo catch ----------
// console.log(error.response);
// let message = error.response.statusText || "Ocurrio un error";
// $axiosAsync.innerHTML = `<h2 style="color: red;">Error ${error.response.status}: ${message} ⚠️</h2>`;
