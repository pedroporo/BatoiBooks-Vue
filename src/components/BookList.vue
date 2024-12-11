<script>
import { store } from "../stores/store";
import BookItem from "./BookItem.vue";
export default {
  name: "BookList",
  components: {
    BookItem,
  },
  async mounted() {
    await store.getBooks();
  },
  computed: {
    books() {
      return store.state.books;
    },
  },
  methods: {
    delBook(index) {
      store.delBook(index, 1);
    },
    editBook(index) {
      this.$router.push({ name: "edit", params: { id: index } });
    },
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
      @delete-book="delBook"
      @edit-book="editBook"
    >
    </book-item>
  </div>
</template>
