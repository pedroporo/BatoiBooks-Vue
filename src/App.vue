<script>
import batoiLogo from "./assets/logoBatoi.png";
import AppMenu from "./components/AppMenu.vue";
import AppMesages from "./components/AppMessages.vue";
import BookList from "./components/BookList.vue";
import AddBook from "./components/AddBook.vue";
import AddCart from "./components/AddCart.vue";
import AboutView from "./views/AboutView.vue";
//import { store } from "./stores/store";
import { useBooksStore } from "./stores/bookStore";
import { useModulesStore } from "./stores/modulesStore";
import { useCartStore } from "./stores/carritoStore";
import { mapState, mapActions } from "pinia";
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
  async mounted() {
    await this.populateBooks();
    await this.populateModules();
    this.populateCart();
  },
  data() {
    return {
      batoiLogo,
    };
  },
  methods: {
    ...mapActions(useBooksStore, ["populateBooks"]),
    ...mapActions(useModulesStore, ["populateModules"]),
    ...mapActions(useCartStore, ["populateCart"]),
  },
};
</script>

<template>
  <header>
    <img :src="batoiLogo" class="logo" alt="Logo Batoi" />
    <h1>BatoiBooks</h1>
  </header>
  <app-menu></app-menu>
  <app-mesages></app-mesages>
  <router-view></router-view>
</template>

<style></style>
