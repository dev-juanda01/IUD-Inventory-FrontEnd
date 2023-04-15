import React, { useState, useEffect } from "react";
import {
  getDocs,
  getDoc,
  postDoc,
  putDoc,
  deleteDoc,
} from "../services/useAxiosHelp";
import ButtonAgregar from "./ButtonAgregar";
import FormSearch from "./FormSearch";
import Logo from "./Logo";
import ModalGlobal from "./ModalGlobal";
import Refresh from "./Refresh";
import SpinnerRenderUI from "./SpinnerRenderUI";
import Table from "./Table";
import Alert from "./Alert";

export default function Estados({ theme }) {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  const enpoint = "estadoequipos";

  const changeRefresh = () => {
    setIsLoading(true);
    setData(null);
    setRefresh(!refresh);
  };

  const listStatus = async () => {
    try {
      let res = await getDocs(enpoint);
      let json = await res.data;
      setData(json);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  const listState = async (nombre) => {
    try {
      setIsLoading(true);
      const res = await getDoc(enpoint, nombre);

      if (res.data.length === 0 || !nombre) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `El estado ${nombre} no existe`,
        });
        setIsLoading(false);
      } else {
        setData(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
      setIsLoading(false);
    }
  };

  const createStatus = async (datos) => {
    try {
      delete datos.id;
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await postDoc(enpoint, datos);
      setData([...data, res.data]);
      Swal.fire("Excelente!", "Estado creado correctamente!", "success");
    } catch (error) {
      let { response } = error;
      if (!response.status) return;
      response.status == 409 &&
        Swal.fire("Oops...!", `${response.data.message}`, "error");
    }
  };

  const updateStatus = async (datos) => {
    try {
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await putDoc(enpoint, datos);
      let statusUpdate = res.data.findEstadoEquipo;

      const dataUpdate = data.map((el) =>
        el._id === statusUpdate._id ? statusUpdate : el
      );
      setData(dataUpdate);
      Swal.fire("Excelente!", "Estado actualizado correctamente!", "success");
    } catch (error) {
      Swal.fire("Oops...!", `${error.response.data.message}`, "error");
    }
  };

  const deleteStatus = async (id) => {
    try {
      Swal.fire({
        title: "¿Estas seguro de eliminar este estado?",
        text: "Este estado sera eliminado de la base de datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDoc(enpoint, id).then((res) => {
            setData(data.filter((el) => el._id !== id));
          });
          Swal.fire("Eliminado!", "Estado eliminado correctamente", "success");
        }
      });
    } catch (error) {
      Swal.fire("Oops...!", `${error.response.data.message}`, "error");
    }
  };

  useEffect(() => {
    listStatus();
  }, [refresh]);

  return (
    <>
      <Logo />
      <div className="container-module">
        <h2> Estados de equipos</h2>
        <div className="header-types">
          <ButtonAgregar />
          <div className="others-search" style={{ display: "flex" }}>
            <Refresh changeRefresh={changeRefresh} />
            <FormSearch ph="Buscar estado" listModule={listState} />
          </div>
        </div>
        {error && <Alert />}
        {isLoading ? (
          <SpinnerRenderUI theme={theme} />
        ) : (
          data && (
            <Table
              datos={data}
              setDataToEdit={setDataToEdit}
              deleteModule={deleteStatus}
            />
          )
        )}
        <ModalGlobal
          module="estados"
          create={createStatus}
          update={updateStatus}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </>
  );
}
