<script>
import { useModulesStore } from "../stores/modulesStore";
import { mapState, mapActions } from "pinia";
export default {
  name: "BookItem",
  props: ["book", "index"],
  emits: ["delete-book", "edit-book"],
  computed: {
    ...mapState(useModulesStore, {
      getModule: "getModule",
    }),
  },
  methods: {
    renderNowDateInfo(date) {
      if (!date) {
        return "En venta";
      } else {
        const dateObject = new Date(date);
        return `Vendido el ${dateObject.toLocaleDateString()}`;
      }
    },
    delBook() {
      if (
        confirm("Estas seguro de eliminar el libro con id: " + this.book.id)
      ) {
        this.$emit("delete-book", this.index);
      }
    },
    editBook() {
      this.$emit("edit-book", this.index);
    },
  },
};
</script>
<template>
  <div class="card" :id="['book-' + book.id]">
    <img :src="book.photo" :alt="['Libro ' + book.id]" />
    <div>
      <h3>{{ this.getModule(book.moduleCode).cliteral }} ({{ book.id }})</h3>
      <h4>{{ book.publisher }}</h4>
      <p>Precio: {{ book.price }} &euro;</p>
      <p>Estado: {{ book.status }}</p>
      <p>{{ this.renderNowDateInfo(book.date) }}</p>
      <p>Comentarios:{{ book.comments }}</p>
      <div :data-id="book.id">
        <slot>
          
        </slot>
      </div>
    </div>
  </div>
</template>
