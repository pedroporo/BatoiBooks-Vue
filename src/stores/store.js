import { reactive } from "vue";
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
export const store = {
  state: reactive({
    books: [],
  }),
  async getBooks() {
    try {
      const response = await books.getAll();
      this.state.books = response.data;
    } catch (response) {
      console.error("Error: " + response.message);
    }
  },
  addTodo(todo) {
    this.state.todos.push(todo);
  },
  delTodo(index) {
    this.state.todos.splice(index, 1);
  },
  updateTodo(index, todo) {
    this.state.todos[index] = todo;
  },
  delAllTodos() {
    this.state.todos = [];
  },
};
