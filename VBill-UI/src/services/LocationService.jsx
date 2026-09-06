import api from "../api/api";

/* ===========================================
   LOCATION CRUD
=========================================== */

export const getAllLocations = async () => {
  const response = await api.get(
    "/vbill/api/locations/getall"
  );

  return response.data;
};

export const createLocation = async (data) => {
  const response = await api.post(
    "/vbill/api/locations/save",
    data
  );

  return response.data;
};

export const updateLocation = async (id, data) => {
  const response = await api.put(
    `/vbill/api/locations/update/${id}`,
    data
  );

  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await api.delete(
    `/vbill/api/locations/delete/${id}`
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

// export const getStates = async () => {
//   const response = await api.get(
//     "/vbill/api/state/getall"
//   );

//   return response.data;
// };

export const getStatesByCountry = async (countryId) => {
  const response = await api.get(
    `/vbill/api/state/country/${countryId}`
  );

  return response.data;
};

/* ===========================================
   CITY
=========================================== */

// export const getCities = async () => {
//   const response = await api.get(
//     "/vbill/api/city/getall"
//   );

//   return response.data;
// };

export const getCitiesByState = async (stateId) => {
  const response = await api.get(
    `/vbill/api/city/state/${stateId}`
  );

  return response.data;
};