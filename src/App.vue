<script>
import batoiLogo from './assets/logoBatoi.png'
import AppMenu from "./components/AppMenu.vue";
import AppMesages from "./components/AppMessages.vue";
import BookList from "./components/BookList.vue";
import AddBook from "./components/AddBook.vue";
import AddCart from "./components/AddCart.vue";
import AboutView from './views/AboutView.vue';
export default {
  name: "App",
  components: {
    AppMenu,
    AppMesages,
    BookList,
    AddBook,
    AddCart,
    AboutView,
  },
  data() {
    return {
      batoiLogo,
    }
  },
  methods: {
    
  },
};
</script>

<template>
  <div>
    <header>
      <img :src="batoiLogo" class="logo" alt="Logo Batoi" />
      <h1>BatoiBooks</h1>
    </header>
    <app-menu></app-menu>
    <app-messages></app-messages>
    <book-list></book-list>
    <add-book></add-book>
    <add-cart></add-cart>
    <about-view></about-view>
  </div>
</template>

<style></style>
