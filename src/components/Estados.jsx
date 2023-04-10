import React, { useState, useEffect } from "react";
import { getDocs, postDoc, putDoc, deleteDoc } from "../services/useAxiosHelp";
import ButtonAgregar from "./ButtonAgregar";
import FormSearch from "./FormSearch";
import Logo from "./Logo";
import ModalGlobal from "./ModalGlobal";
import Table from "./Table";

export default function Estados() {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);

  const enpoint = "estadoequipos";

  const listStatus = async () => {
    try {
      let res = await getDocs(enpoint);
      let json = await res.data;
      setData(json);

      console.log("estados", data);
      console.log(json);
    } catch (error) {}
  };

  const createStatus = async (datos) => {
    try {
      delete datos.id;
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await postDoc(enpoint, datos);
      setData([...data, res.data.nuevoEstadoEquipo]);
      alert("Estado creado correctamente");

      console.log(data, res);
    } catch (error) {
      let { response } = error;
      if (!response.status) return;
      response.status == 409 && alert(response.data.message);
      console.log(error);
    }
  };

  const updateStatus = async (datos) => {
    try {
      console.log(datos);
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await putDoc(enpoint, datos);
      let statusUpdate = res.data.findEstadoEquipo;

      const dataUpdate = data.map((el) =>
        el._id === statusUpdate._id ? statusUpdate : el
      );
      setData(dataUpdate);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStatus = async (id) => {
    try {
      console.log(id);
      const isDelete = confirm("¿Estas seguro de eliminar este estado?");

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
    listStatus();
    console.log(data);
  }, [enpoint]);

  return (
    <>
      <Logo />
      <div>
        <h2> Estados de equipos</h2>
        <div className="header-types">
          <ButtonAgregar />
          <FormSearch />
        </div>
        {data && (
          <Table
            datos={data}
            setDataToEdit={setDataToEdit}
            deleteStatus={deleteStatus}
          />
        )}
        <ModalGlobal
          createStatus={createStatus}
          updateStatus={updateStatus}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </>
  );
}
