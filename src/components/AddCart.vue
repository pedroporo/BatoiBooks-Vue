<script>
import { useCartStore } from "@/stores/carritoStore";
import { mapState, mapActions } from "pinia";
import BookItem from "./BookItem.vue";
export default {
  name: "AddCart",
  components: {
    BookItem,
  },
  computed: {
    ...mapState(useCartStore, {
      carrito: "carrito",
    }),
  },
  methods: {
    delBook(book) {
      this.delBook(book.id);
    },
    checkOut() {
      alert("Has ralizado la compra");
    },
    delAll() {
      if (confirm("Estas seguro de que quieres vacial el carrito")) {
        this.resetCart();
      }
    },
    ...mapActions(useCartStore, ["delBook", "resetCart"]),
  },
};
</script>
<template>
  <h3 style="color: white">
    Total de libros en el carrito: {{ this.carrito.length }}
  </h3>
  <p>
    Total:
    {{
      this.carrito.reduce((total, book) => (total += parseInt(book.price)), 0)
    }}
    €
  </p>
  <button @click="delAll" class="production_quantity_limits">
    <span class="material-icons">production_quantity_limits</span>
  </button>
  <button @click="checkOut" class="shopping_cart_checkout">
    <span class="material-icons">shopping_cart_checkout</span>
  </button>
  <div id="cart" class="page">
    <book-item
      v-for="book in carrito"
      :key="book.id"
      :book="book"
      :index="book.id"
    >
      <button @click="delBook(book)" class="remove_shopping_cart">
        <span class="material-icons">remove_shopping_cart</span>
      </button>
    </book-item>
  </div>
</template>
