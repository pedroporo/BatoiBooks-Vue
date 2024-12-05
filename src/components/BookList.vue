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
    /*async getData() {
      try {
        const response = await apiService.books.getAll();
        console.log(response.data);

        this.books = response.data;
        return response.data;
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },*/
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
    </book-item>
  </div>
</template>
