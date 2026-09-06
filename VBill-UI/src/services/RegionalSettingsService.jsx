import api from "../api/api";

/* ---------------- COUNTRY ---------------- */

export const getCountries = async () => {
  const response = await api.get(
    "/vbill/api/country/getall"
  );

  return response.data;
};

export const saveCountry = async (data) => {
  const response = await api.post(
    "/vbill/api/country/saveCountry",
    data
  );

  return response.data;
};

/* ---------------- STATE ---------------- */

export const getStates = async () => {
  const response = await api.get(
    "/vbill/api/state/getall"
  );

  return response.data;
};

export const saveState = async (data) => {
  const response = await api.post(
    "/vbill/api/state/saveState",
    data
  );

  return response.data;
};

/* ---------------- CITY ---------------- */

export const getCities = async () => {
  const response = await api.get(
    "/vbill/api/city/getall"
  );

  return response.data;
};

export const saveCity = async (data) => {
  const response = await api.post(
    "/vbill/api/city/saveCity",
    data
  );

  return response.data;
};