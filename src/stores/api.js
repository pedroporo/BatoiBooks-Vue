import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export const books = {
  getAll: () => apiClient.get(`/books`),
  getOne: (id) => apiClient.get(`/books/${id}`),
  create: (book) => apiClient.post(`/books`, book),
  modify: (book) => apiClient.put(`/books/${book.id}`, book),
  delete: (id) => apiClient.delete(`/books/${id}`),
};
export const modules = {
  getAll: () => apiClient.get(`/modules`),
  getOne: (id) => apiClient.get(`/modules/${id}`),
  create: (book) => apiClient.post(`/modules`, book),
  modify: (book) => apiClient.put(`/modules/${book.id}`, book),
  delete: (id) => apiClient.delete(`/modules/${id}`),
};
