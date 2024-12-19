import { defineStore } from "pinia";
import api from "./api.js";

export const useCartStore = defineStore("carritoStore", {
  state() {
    return {
      carrito: [],
    };
  },
  actions: {
    populateCart() {
      if (!localStorage.carrito || localStorage.carrito.lenght === 0) {
        this.resetCart();
      }
      if (localStorage.carrito.lenght != 0) {
        this.carrito = Array.from(JSON.parse(localStorage.carrito));
      }
    },
    updateCart() {
      localStorage.carrito = JSON.stringify(this.carrito);
    },
    addBook(book) {
      try {
        this.carrito.push(book);
        this.updateCart();
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    resetCart() {
      this.carrito = [];
      this.updateCart();
    },
    delBook(index) {
      try {
        const indice = this.carrito.findIndex((book) => book.id === index);
        this.carrito.splice(indice, 1);
        this.updateCart();
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
  },
});
