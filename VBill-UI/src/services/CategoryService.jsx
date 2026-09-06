import api from "../api/api";

const BASE_URL = "/vbill/api/itemCategory";

/* -----------------------------
   Get All Categories
----------------------------- */

export const getAllCategories = () => {
  return api.get(`${BASE_URL}/getall`);
};

/* -----------------------------
   Get Category By Id
----------------------------- */

export const getCategoryById = (id) => {
  return api.get(`${BASE_URL}/getById/${id}`);
};

/* -----------------------------
   Create Category
----------------------------- */

export const createCategory = (data) => {
  return api.post(`${BASE_URL}/saveItemCategory`, data);
};

/* -----------------------------
   Update Category
----------------------------- */

export const updateCategory = (id, data) => {
  return api.put(`${BASE_URL}/update/${id}`, data);
};

/* -----------------------------
   Delete Category
----------------------------- */

export const deleteCategory = (id) => {
  return api.delete(`${BASE_URL}/delete/${id}`);
};