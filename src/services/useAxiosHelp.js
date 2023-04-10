import axios from "axios";
import { axiosConfig } from "../helpers/axiosConfig";

const getDoc = (enpoint) => {
  return axiosConfig.get(enpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const postDoc = (enpoint, data) => {
  return axiosConfig.post(enpoint, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const putDoc = (enpoint, data) => {
  return axiosConfig.put(`${enpoint}?id=${data._id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteDoc = (enpoint, id) => {
  return axiosConfig.delete(`${enpoint}?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getDoc, postDoc, putDoc, deleteDoc };
