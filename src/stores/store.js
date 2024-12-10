import { reactive } from "vue";
import api from './api.js';
export const store = {
  state: reactive({
    books: [],
  }),
  async getBooks() {
    try {
      const response = await api.books.getAll();
      this.state.books = response.data;
    } catch (response) {
      console.error("Error: " + response.message);
    }
  },
  addTodo(todo) {
    this.state.todos.push(todo);
  },
  async delBook(index) {
    try {
      const indice=this.state.books.findIndex(book => book.id===index);
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
