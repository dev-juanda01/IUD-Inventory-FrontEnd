import React from "react";
import FormInventario from "./FormInventario";
import FormTipos from "./FormTipos";

export default function ModalGlobal({
  module,
  create,
  update,
  data,
  dataToEdit,
  setDataToEdit,
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
              {module === "inventarios" && <FormInventario data={data} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
