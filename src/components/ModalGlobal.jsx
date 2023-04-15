import React from "react";
import FormEstados from "./FormEstados";
import FormInventario from "./FormInventario";
import FormMarcas from "./FormMarcas";
import FormTipos from "./FormTipos";
import FormUsuarios from "./FormUsuarios";

export default function ModalGlobal({
  module,
  create,
  update,
  data,
  dataToEdit,
  setDataToEdit,
  dataModules,
}) {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {dataToEdit ? "Editar" : "Agregar"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {module === "tipos" && (
                <FormTipos
                  createType={create}
                  updateType={update}
                  dataToEdit={dataToEdit}
                  setDataToEdit={setDataToEdit}
                />
              )}
              {module === "estados" && (
                <FormEstados
                  createStatus={create}
                  updateStatus={update}
                  dataToEdit={dataToEdit}
                  setDataToEdit={setDataToEdit}
                />
              )}
              {module === "marcas" && (
                <FormMarcas
                  createMark={create}
                  updateMark={update}
                  dataToEdit={dataToEdit}
                  setDataToEdit={setDataToEdit}
                />
              )}
              {module === "usuarios" && (
                <FormUsuarios
                  createUser={create}
                  updateUser={update}
                  dataToEdit={dataToEdit}
                  setDataToEdit={setDataToEdit}
                />
              )}
              {module === "inventarios" && (
                <FormInventario
                  data={data}
                  createInventory={create}
                  updateInventory={update}
                  dataToEdit={dataToEdit}
                  setDataToEdit={setDataToEdit}
                  dataModules={dataModules}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
