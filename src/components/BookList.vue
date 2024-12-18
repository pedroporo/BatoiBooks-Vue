<script>
/*import { store } from "../stores/store";*/
import BookItem from "./BookItem.vue";
import { useBooksStore } from "../stores/bookStore";
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
    delBook(index) {
      /*store.delBook(index, 1);*/
      //this.delBook(index);
      console.log(index);
      
    },
    editBook(index) {
      //this.$router.push({ name: "edit", params: { id: index } });
      console.log(index);
      
    },
    ...mapActions(useBooksStore, ["populateBooks", "delBook"]),
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
      <button class="add-to-cart">
        <span class="material-icons">add_shopping_cart</span>
      </button>
      <button @click="editBook" class="edit">
        <span class="material-icons">edit</span>
      </button>
      <button @click="delBook" class="remove">
        <span class="material-icons">delete</span>
      </button>
    </book-item>
  </div>
</template>
