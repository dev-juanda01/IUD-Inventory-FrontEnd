import React, { useState, useEffect } from "react";
import ButtonAgregar from "./ButtonAgregar";
import FormSearch from "./FormSearch";
import Logo from "./Logo";
import { getDocs } from "../services/useAxiosHelp";
import CardGroup from "./CardGroup";
import ModalGlobal from "./ModalGlobal";

export default function Inventarios() {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [dataModules, setDataModules] = useState(null);

  let enpoint = "inventarios";

  const listModules = async () => {
    try {
      const resType = await getDocs("tipoequipos"),
        tipo = resType.data.map((el) => {
          return { id: el._id, nombre: el.nombre };
        });

      const resState = await getDocs("estadoequipos"),
        estado = resState.data.map((el) => {
          return { id: el._id, nombre: el.nombre };
        });

      const resMark = await getDocs("marcaequipos"),
        marca = resMark.data.map((el) => {
          return { id: el._id, nombre: el.nombre };
        });

      const resUser = await getDocs("usuarios"),
        usuario = resUser.data.map((el) => {
          return { id: el._id, nombre: el.nombre };
        });

      const arrayDataModules = [tipo, estado, marca, usuario];
      setDataModules(arrayDataModules);
    } catch (error) {
      console.log(error);
    }
  };

  const listInventories = async () => {
    try {
      const { data } = await getDocs(enpoint);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createInventory = async (datos) => {
    try {
      delete datos.id;

      const res = await postDoc(enpoint, datos);
      setData([...data, res.data.nuevoTipoEquipo]);
      alert("Inventario creado correctamente");

      console.log(data, res);
    } catch (error) {
      let { response } = error;
      if (!response.status) return;
      response.status == 409 && alert(response.data.message);
      console.log(error);
    }
  };

  const updateInventory = async (datos) => {
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

  const deleteInventory = async (id) => {
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
    listModules();
    listInventories();
  }, [enpoint]);

  return (
    <>
      <Logo />
      <div>
        <h2>Inventarios</h2>
        <div className="header-types">
          <ButtonAgregar />
          <FormSearch />
        </div>
        {data && (
          <CardGroup data={data} setData={data} dataModules={dataModules} />
        )}
        <ModalGlobal
          module="inventarios"
          create={createInventory}
          update={updateInventory}
          data={data}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </>
  );
}
