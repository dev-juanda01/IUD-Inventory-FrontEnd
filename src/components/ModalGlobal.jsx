import React from "react";
import FormTipos from "./FormTipos";

export default function ModalGlobal({
  createType,
  updateType,
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
              <FormTipos
                createType={createType}
                updateType={updateType}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
