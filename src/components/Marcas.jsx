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

export default function Marcas({ theme }) {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  const enpoint = "marcaequipos";

  const changeRefresh = () => {
    setIsLoading(true);
    setData(null);
    setRefresh(!refresh);
  };

  const listMarks = async () => {
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

  const listMark = async (nombre) => {
    try {
      setIsLoading(true);
      const res = await getDoc(enpoint, nombre);

      if (res.data.length === 0 || !nombre) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `La marca ${nombre} no existe`,
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

  const createMark = async (datos) => {
    try {
      delete datos.id;
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await postDoc(enpoint, datos);
      setData([...data, res.data]);
      Swal.fire("Excelente!", "Marca creada correctamente!", "success");
    } catch (error) {
      let { response } = error;
      if (!response.status) return;
      response.status == 409 &&
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response.data.message}`,
        });
    }
  };

  const updateMark = async (datos) => {
    try {
      delete datos.fechaActualizacion;
      delete datos.fechaCreacion;

      datos.estado = datos.estado === "true" ? true : false;

      const res = await putDoc(enpoint, datos);

      const dataUpdate = data.map((el) =>
        el._id === res.data._id ? res.data : el
      );
      setData(dataUpdate);
      Swal.fire("Excelente!", "Marca actualizada correctamente!", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  };

  const deleteMark = async (id) => {
    try {
      Swal.fire({
        title: "¿Estas seguro de eliminar esta marca?",
        text: "Esta marca sera eliminado de la base de datos",
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
          Swal.fire("Eliminado!", "Marca eliminada correctamente", "success");
        }
      });
    } catch (error) {
      Swal.fire("Oops...!", `${error.response.data.message}`, "error");
    }
  };

  useEffect(() => {
    listMarks();
  }, [refresh]);

  return (
    <>
      <Logo />
      <div className="container-module">
        <h2>Marcas de equipos</h2>
        <div className="header-types">
          <ButtonAgregar />
          <div className="others-search" style={{ display: "flex" }}>
            <Refresh changeRefresh={changeRefresh} />
            <FormSearch ph="Buscar marca" listModule={listMark} />
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
              deleteModule={deleteMark}
            />
          )
        )}
        <ModalGlobal
          module="marcas"
          create={createMark}
          update={updateMark}
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
