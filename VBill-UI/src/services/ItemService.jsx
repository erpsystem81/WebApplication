import api from "../api/api";

/* ===========================================
   LOCATION CRUD
=========================================== */

export const getAllLocations = async () => {
  const response = await api.get(
    "/vbill/api/locations/getall"
  );

  return response;
};

export const getAllItems = async () => {
  const response = await api.get(
    "/vbill/api/item/getall"
  );

  return response.data;
};

export const getAllItemTypes = async () => {
  const response = await api.get(
    "/vbill/api/itemType/getall"
  );

  return response;
};

export const getAllTaxCodes = async () => {
  const response = await api.get(
    "/vbill/api/taxCode/getall"
  );

  return response;
};

export const getAllUnits = async () => {
  const response = await api.get(
    "/vbill/api/units/getall"
  );

  return response;
};

export const getAllCategories = async () => {
  const response = await api.get(
    "/vbill/api/itemCategory/getall"
  );

  return response;
};

export const createItem = async (data) => {
  const response = await api.post(
    "/vbill/api/item/saveItem",
    data
  );

  return response;
};


export const updateItem = async (id, data) => {
  const response = await api.put(
    `/vbill/api/item/update/${id}`,
    data
  );

  return response.data;
};

export const deleteItem = async (id) => {
  const response = await api.delete(
    `/vbill/api/item/delete/${id}`
  );

  return response.data;
};

/* ===========================================
   COUNTRY
=========================================== */

export const getCountries = async () => {
  const response = await api.get(
    `/vbill/api/country/getall`
  );

  return response.data;
};

/* ===========================================
   STATE
=========================================== */

export const getStates = async () => {
  const response = await api.get(
    "/vbill/api/state/getall"
  );

  return response.data;
};

export const getStatesByCountry = async (countryId) => {
  const response = await api.get(
    `/vbill/api/state/country/${countryId}`
  );

  return response.data;
};

/* ===========================================
   CITY
=========================================== */

export const getCities = async () => {
  const response = await api.get(
    "/vbill/api/city/getall"
  );

  return response.data;
};

export const getCitiesByState = async (stateId) => {
  const response = await api.get(
    `/vbill/api/city/state/${stateId}`
  );

  return response.data;
};