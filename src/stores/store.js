import { reactive } from "vue";
import api from './api';
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
