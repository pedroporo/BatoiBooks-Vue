<script>
import { store } from "@/stores/store";
export default {
  name: "AddBok",
  data() {
    return {
      book: {},
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getBook();
    }
  },
  watch: {
    book(id, oldId) {
      id !== oldId ? this.getBook : (this.book = {});
    },
  },
  computed: {
    modules() {
      return store.state.modules;
    },
    states() {
      return store.state.states;
    },
  },
  methods: {
    addBook() {
      try {
        if (!this.book.id) {
          store.addBook(this.book);
        } else {
          store.modBook(this.book);
        }
      } catch (error) {
        console.log(error);
      }
      this.book = {};
      this.$router.push({ path: "list" });
    },
    controlForm() {
      if (!this.book.id) {
        this.book = {};
      } else {
        this.getBook();
      }
    },
    async getBook() {
      this.book = await store.getBook(this.$route.params.id);
    },
  },
};
</script>
<template>
  <div id="form" class="page">
    <p v-if="!this.book.id">Añadir libro</p>
    <p v-else>Editar libro</p>
    <form ref="bookForm" @submit.prevent="addBook" @reset.prevent="controlForm">
      <div :class="{ hidden: !book.id }">
        <label for="id-book" id="label-id-book">Id:</label>
        <input type="text" v-model="book.id" id="id-book" disabled />
      </div>

      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module" v-model="book.moduleCode" required>
          <option default hidden value="">- Selecciona un módulo -</option>
          <option v-for="module in modules" :value="module.code">
            {{ module.cliteral }}
          </option>
        </select>
        <span class="errorM"></span>
      </div>

      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" required v-model="book.publisher" />
        <span class="errorM"></span>
      </div>

      <div>
        <label for="price">Precio:</label>
        <input
          type="number"
          id="price"
          min="0"
          step="0.01"
          required
          v-model="book.price"
        />
        <span class="errorM"></span>
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <input
          type="number"
          id="pages"
          required
          min="0"
          step="1"
          v-model="book.pages"
        />
        <span class="errorM"></span>
      </div>

      <div id="status">
        <label>Estado:</label>
        <!-- Aquí poned un radiobutton para cada estado -->
        <label v-for="state in states">
          <input
            type="radio"
            :class="['state_' + state]"
            v-model="book.status"
            :value="state"
            required
          />
          <span>{{ state }}</span>
        </label>

        <span class="errorM"></span>
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <textarea v-model="book.comments" id="comments"></textarea>
      </div>

      <button v-if="!book.id" type="submit">Añadir</button>
      <button v-else type="submit">Editar</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>
