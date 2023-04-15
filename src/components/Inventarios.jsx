import React, { useState, useEffect } from "react";
import ButtonAgregar from "./ButtonAgregar";
import FormSearch from "./FormSearch";
import Logo from "./Logo";
import {
  getDocs,
  getDocSerial,
  postDoc,
  putDoc,
  deleteDoc,
} from "../services/useAxiosHelp";
import CardGroup from "./CardGroup";
import ModalGlobal from "./ModalGlobal";
import Refresh from "./Refresh";
import SpinnerRenderUI from "./SpinnerRenderUI";
import Alert from "./Alert";

export default function Inventarios({ theme }) {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [dataModules, setDataModules] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  let enpoint = "inventarios";

  const changeRefresh = () => {
    setIsLoading(true);
    setData(null);
    setRefresh(!refresh);
  };

  const listModules = async () => {
    try {
      const resType = await getDocs("tipoequipos"),
        tipo = resType.data.map((el) => {
          return { id: el._id, nombre: el.nombre, estado: el.estado };
        });

      const resState = await getDocs("estadoequipos"),
        estado = resState.data.map((el) => {
          return { id: el._id, nombre: el.nombre, estado: el.estado };
        });

      const resMark = await getDocs("marcaequipos"),
        marca = resMark.data.map((el) => {
          return { id: el._id, nombre: el.nombre, estado: el.estado };
        });

      const resUser = await getDocs("usuarios"),
        usuario = resUser.data.map((el) => {
          return { id: el._id, nombre: el.nombre, estado: el.estado };
        });

      const arrayDataModules = [tipo, estado, marca, usuario];
      setDataModules(arrayDataModules);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      Swal.fire("Oops...!", `${error}`, "error");
    }
  };

  const listInventories = async () => {
    try {
      const { data } = await getDocs(enpoint);
      setData(data);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      Swal.fire("Oops...!", `${error}`, "error");
    }
  };

  const listInventory = async (serial) => {
    try {
      setIsLoading(true);
      serial = serial.toUpperCase();
      const res = await getDocSerial(enpoint, serial);

      if (serial) {
        setData([res.data]);
      } else {
        setData([...res.data]);
      }
      setIsLoading(false);
    } catch (error) {
      Swal.fire("Oops...!", `${error.response.data.message}`, "error");
      setIsLoading(false);
    }
  };

  const createInventory = async (datos) => {
    try {
      delete datos.id;

      const res = await postDoc(enpoint, datos);
      setData([...data, res.data]);
      Swal.fire("Excelente!", "Inventario creado correctamente!", "success");
    } catch (error) {
      let { response } = error;
      if (!response.status) return;
      response.status == 409 &&
        Swal.fire("Oops...!", `${response.data.message}`, "error");
    }
  };

  const updateInventory = async (datos) => {
    try {
      datos.tipo = datos.tipo.id;
      datos.estado = datos.estado.id;
      datos.marca = datos.marca.id;
      datos.usuario = datos.usuario.id;
      console.log(datos);

      const res = await putDoc(enpoint, datos);

      const dataUpdate = data.map((el) =>
        el._id === res.data._id ? res.data : el
      );
      setData(dataUpdate);
      Swal.fire(
        "Excelente!",
        "Inventario actualizado correctamente!",
        "success"
      );
    } catch (error) {
      Swal.fire("Oops...!", `${error.response.data.message}`, "error");
    }
  };

  const deleteInventory = async (id) => {
    try {
      Swal.fire({
        title: "¿Estas seguro de eliminar este inventario?",
        text: "Este inventario sera eliminado de la base de datos",
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
          Swal.fire(
            "Eliminado!",
            "Inventario eliminado correctamente",
            "success"
          );
        }
      });
    } catch (error) {
      Swal.fire("Oops...!", `${error.response.data.message}`, "error");
    }
  };

  useEffect(() => {
    listModules();
    listInventories();
  }, [refresh]);

  return (
    <>
      <Logo />
      <div>
        <div className="container-inv">
          <h2>Inventarios</h2>
          <div className="header-types">
            <ButtonAgregar />
            <div className="others-search" style={{ display: "flex" }}>
              <Refresh changeRefresh={changeRefresh} />
              <FormSearch ph="Escribe el serial" listModule={listInventory} />
            </div>
          </div>
        </div>
        {error && <Alert />}
        {isLoading ? (
          <SpinnerRenderUI theme={theme} />
        ) : (
          data && (
            <CardGroup
              data={data}
              setDataToEdit={setDataToEdit}
              deleteInventory={deleteInventory}
              dataModules={dataModules}
            />
          )
        )}
        <ModalGlobal
          module="inventarios"
          create={createInventory}
          update={updateInventory}
          data={data}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          dataModules={dataModules}
        />
      </div>
    </>
  );
}
