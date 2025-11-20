import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const noteService = {
  getAllNotes: () => api.get("/notes"),
  getNote: (id) => api.get(`/notes/${id}`),
  createNote: (data) => api.post("/notes", data),
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export default api;
