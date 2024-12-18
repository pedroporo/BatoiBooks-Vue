import { defineStore } from "pinia";
import api from "./api.js";

export const useBooksStore = defineStore("bookStore", {
  state() {
    return {
      states: ["new", "good", "used", "bad"],
      books: [],
    };
  },
  getters: {
    getBook: (state) => async (bookId) => (await api.books.getOne(bookId)).data,
  },
  actions: {
    async populateBooks() {
      try {
        const response = await api.books.getAll();
        this.books = response.data;
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async addBook(book) {
      try {
        const response = await api.books.create(book);
        if (response) {
          this.books.push(book);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async modBook(book) {
      try {
        const response = await api.books.modify(book);
        if (response) {
          this.books.push(book);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async delBook(index) {
      try {
        const indice = this.books.findIndex((book) => book.id === index);
        const response = await api.books.delete(index);
        if (response) {
          this.books.splice(indice, 1);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
  },
});
