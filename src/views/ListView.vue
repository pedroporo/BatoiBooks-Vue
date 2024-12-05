<script>
import AppMenu from "../components/AppMenu.vue";
import AppMesages from "../components/AppMessages.vue";
import BookList from "../components/BookList.vue";
import AboutView from "../views/AboutView.vue";
export default {
  name: "ListView",
  components: {
    AppMenu,
    AppMesages,
    BookList,
    AboutView,
  },
  data() {
    return {
      batoiLogo,
    };
  },
  methods: {},
};
</script>

<template>
  <header>
    <img :src="batoiLogo" class="logo" alt="Logo Batoi" />
    <h1>BatoiBooks</h1>
  </header>
  <app-menu></app-menu>
  <app-mesages></app-mesages>
  <book-list></book-list>
  <about-view></about-view>
</template>
