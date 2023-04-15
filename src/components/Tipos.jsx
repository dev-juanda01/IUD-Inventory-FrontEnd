import React, { useState, useEffect } from "react";
import {
  getDocs,
  getDoc,
  postDoc,
  putDoc,
  deleteDoc,
} from "../services/useAxiosHelp";
import Alert from "./Alert";
import ButtonAgregar from "./ButtonAgregar";
import FormSearch from "./FormSearch";
import Logo from "./Logo";
import ModalGlobal from "./ModalGlobal";
import Refresh from "./Refresh";
import SpinnerRenderUI from "./SpinnerRenderUI";
import Table from "./Table";

export default function Tipos({ theme }) {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  const enpoint = "tipoequipos";

  const changeRefresh = () => {
    setIsLoading(true);
    setData(null);
    setRefresh(!refresh);
  };

  const listTypes = async () => {
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

  const listType = async (nombre) => {
    try {
      setIsLoading(true);
      const res = await getDoc(enpoint, nombre);

      if (res.data.length === 0 || !nombre) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Tipo ${nombre} no existe`,
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

  const createType = async (datos) => {
    try {
      delete datos.id;
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await postDoc(enpoint, datos);
      setData([...data, res.data.nuevoTipoEquipo]);
      Swal.fire("Excelente!", "Tipo creado correctamente!", "success");
    } catch (error) {
      let { response } = error;
      if (!response.status) return;
      response.status == 409 &&
        Swal.fire("Oops...!", `${response.data.message}`, "error");
    }
  };

  const updateType = async (datos) => {
    try {
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await putDoc(enpoint, datos);
      let typeUpdate = res.data.findTipoEquipo;

      const dataUpdate = data.map((el) =>
        el._id === typeUpdate._id ? typeUpdate : el
      );
      setData(dataUpdate);
      Swal.fire("Excelente!", "Tipo actualizado correctamente!", "success");
    } catch (error) {
      Swal.fire("Oops...!", `${error.response.data.message}`, "error");
    }
  };

  const deleteType = async (id) => {
    try {
      Swal.fire({
        title: "¿Estas seguro de eliminar este tipo?",
        text: "Este tipo sera eliminado de la base de datos",
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
          Swal.fire("Eliminado!", "Tipo eliminado correctamente", "success");
        }
      });
    } catch (error) {
      Swal.fire("Oops...!", `${error.response.data.message}`, "error");
    }
  };

  useEffect(() => {
    listTypes();
  }, [refresh]);

  return (
    <>
      <Logo />
      <div className="container-module">
        <h2> Tipos de equipos</h2>
        <div className="header-types">
          <ButtonAgregar />
          <div className="others-search" style={{ display: "flex" }}>
            <Refresh changeRefresh={changeRefresh} />
            <FormSearch ph="Buscar tipo" listModule={listType} />
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
              deleteModule={deleteType}
            />
          )
        )}
        <ModalGlobal
          module="tipos"
          create={createType}
          update={updateType}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </>
  );
}
