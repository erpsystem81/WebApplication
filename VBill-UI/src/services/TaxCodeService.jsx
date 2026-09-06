import api from "../api/api";

const BASE_URL = "/vbill/api/taxCode";

/* -----------------------------
   Get All Tax Codes
----------------------------- */
export const getAllTaxCodes = () => {
  return api.get(`${BASE_URL}/getall`);
};

/* -----------------------------
   Get Tax Code By Id
----------------------------- */
export const getTaxCodeById = (id) => {
  return api.get(`${BASE_URL}/getById/${id}`);
};

/* -----------------------------
   Create Tax Code
----------------------------- */
export const createTaxCode = (data) => {
  return api.post(`${BASE_URL}/saveTaxCode`, data);
};

/* -----------------------------
   Update Tax Code
----------------------------- */
export const updateTaxCode = (id, data) => {
  return api.put(`${BASE_URL}/update/${id}`, data);
};

/* -----------------------------
   Delete Tax Code
----------------------------- */
export const deleteTaxCode = (id) => {
  return api.delete(`${BASE_URL}/delete/${id}`);
};

/* ===========================================
   TAX CODE DETAILS
=========================================== */

export const getAllTaxCodeDetails = async () => {
  const response = await api.get(
    "/vbill/api/taxCodeDetails/getall"
  );

  return response.data;
};

export const getTaxCodeDetailById = async (id) => {
  const response = await api.get(
    `/vbill/api/taxCodeDetails/${id}`
  );

  return response.data;
};

export const createTaxCodeDetail = async (data) => {
  const response = await api.post(
    "/vbill/api/taxCodeDetails/saveTaxCodeDetails",
    data
  );

  return response.data;
};

export const updateTaxCodeDetail = async (id, data) => {
  const response = await api.put(
    `/vbill/api/taxCodeDetails/update/${id}`,
    data
  );

  return response.data;
};

export const deleteTaxCodeDetail = async (id) => {
  const response = await api.delete(
    `/vbill/api/taxCodeDetails/delete/${id}`
  );

  return response.data;
};