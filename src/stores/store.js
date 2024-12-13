import { reactive } from "vue";
import api from "./api.js";
export const store = {
  state: reactive({
    states: ["new", "good", "used", "bad"],
    books: [],
    modules: [],
    messages: [],
  }),
  async getBooks() {
    try {
      const response = await api.books.getAll();
      this.state.books = response.data;
    } catch (response) {
      console.error("Error: " + response.message);
    }
  },
  async getBook(id) {
    try {
      const response = await api.books.getOne(id);
      return response.data;
    } catch (response) {
      console.error("Error: " + response.message);
    }
  },
  async getModules() {
    try {
      const response = await api.modules.getAll();
      this.state.modules = response.data;
    } catch (response) {
      console.error("Error: " + response.message);
    }
  },
  addMessage(tipo, message) {
    this.state.messages.push({ tipo: tipo, message: message });
  },
  delMessage(index) {
    this.state.messages.splice(index, 1);
  },
  async addBook(book) {
    try {
      const response = await api.books.create(book);
      if (response) {
        this.state.books.push(book);
      }
    } catch (response) {
      console.error("Error: " + response.message);
    }
  },
  async modBook(book) {
    try {
      const response = await api.books.modify(book);
      if (response) {
        this.state.books.push(book);
      }
    } catch (response) {
      console.error("Error: " + response.message);
    }
  },
  async delBook(index) {
    try {
      const indice = this.state.books.findIndex((book) => book.id === index);
      const response = await api.books.delete(index);
      if (response) {
        this.state.books.splice(indice, 1);
      }
    } catch (response) {
      console.error("Error: " + response.message);
    }
  },
  updateTodo(index, todo) {
    this.state.todos[index] = todo;
  },
  delAllTodos() {
    this.state.todos = [];
  },
};
