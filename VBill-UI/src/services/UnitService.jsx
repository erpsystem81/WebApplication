import api from "../api/api";

const BASE_URL = "/vbill/api/units";

export const getAllUnits = () => {
  return api.get(`${BASE_URL}/getall`);
};

export const createUnit = (data) => {
  return api.post(`${BASE_URL}/saveUnit`, data);
};


export const updateUnit = (id, data) => {
  return api.put(`${BASE_URL}/update/${id}`, data);
};

export const deleteUnit = (id) => {
  return api.delete(`${BASE_URL}/delete/${id}`);
};

export const getUnitById = (id) => {
  return api.get(`${BASE_URL}/getById/${id}`);
};