<script>
/*import { store } from "../stores/store";*/
import BookItem from "./BookItem.vue";
import { useBooksStore } from "../stores/bookStore";
import { useCartStore } from "@/stores/carritoStore";
import { mapState, mapActions } from "pinia";
export default {
  name: "BookList",
  components: {
    BookItem,
  },
  async mounted() {
    await this.populateBooks();
  },
  computed: {
    ...mapState(useBooksStore, {
      books: "books",
    }),
  },
  methods: {
    delBook(book) {
      this.delBook(book.id);
    },
    editBook(book) {
      this.$router.push({ name: "edit", params: { id: book.id } });
    },
    addToCart(book) {
      this.addBook(book);
    },
    ...mapActions(useBooksStore, ["populateBooks", "delBook"]),
    ...mapActions(useCartStore, ["addBook"]),
  },
};
</script>
<template>
  <div id="list" class="page">
    <book-item
      v-for="book in books"
      :key="book.id"
      :book="book"
      :index="book.id"
    >
      <button @click="addToCart(book)" class="add-to-cart">
        <span class="material-icons">add_shopping_cart</span>
      </button>
      <button @click="editBook(book)" class="edit">
        <span class="material-icons">edit</span>
      </button>
      <button @click="delBook(book)" class="remove">
        <span class="material-icons">delete</span>
      </button>
    </book-item>
  </div>
</template>
