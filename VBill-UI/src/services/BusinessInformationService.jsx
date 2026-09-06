import api from "../api/api";
const BASE_URL = "/vbill/api/business";
/* ───────────────────────────── */

export const SaveBusinessInfo = async (data) => {
    const response = await api.post(
       `${BASE_URL}/save`,
        data
    );

    return response.data;
};

/* ───────────────────────────── */

export const getCountries = async () => {
    const response = await api.get(
        `/vbill/api/country/getall`
    );

    return response.data;
};


/* ───────────────────────────── */

export const getStatesByCountry = async (countryId) => {

    const response = await api.get(
        `/vbill/api/state/country/${countryId}`
    );

    return response.data;
};
/* ───────────────────────────── */

export const getCitiesByState = async (stateId) => {

  const response = await api.get(
    `/vbill/api/city/state/${stateId}`
  );

  return response.data;
};