<script>
export default {
  name: "BookItem",
  props: ["book", "index"],
  emits: ["delete-book", "edit-book"],
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
      <h3>{{ book.moduleName }} ({{ book.id }})</h3>
      <h4>{{ book.publisher }}</h4>
      <p>Precio: {{ book.price }} &euro;</p>
      <p>Estado: {{ book.status }}</p>
      <p>{{ this.renderNowDateInfo(book.date) }}</p>
      <p>Comentarios:{{ book.comments }}</p>
      <div :data-id="book.id">
        <button class="add-to-cart">
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button @click="editBook" class="edit">
          <span class="material-icons">edit</span>
        </button>
        <button @click="delBook" class="remove">
          <span class="material-icons">delete</span>
        </button>
      </div>
    </div>
  </div>
</template>
