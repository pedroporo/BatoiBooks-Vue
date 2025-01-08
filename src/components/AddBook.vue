<script>
//import { store } from "@/stores/store";
import { useBooksStore } from "../stores/bookStore";
import { useModulesStore } from "../stores/modulesStore";
import { useMessageStore } from "@/stores/messagesStore";
import { mapState, mapActions } from "pinia";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
/*yup.addMethod(yup.Schema, "fbookExist", function (errorMessage) {
  return this.test(`book`, errorMessage, async function (value) {
    const bookApi = await this.exists(this.book);
    return (
      (value.id !== bookApi.id &&
        value.moduleCode === bookApi.moduleCode &&
        value.userId === bookApi.userId) ||
      createError({ path, message: errorMessage })
    );
  });
});*/
export default {
  name: "AddBok",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const bookSchema = yup.object({
      moduleCode: yup.string().required("Tienes que seleccionar algun modulo"),
      publisher: yup.string().required("La Editorial es OBLIGATORIA"),
      price: yup
        .number("En este campo solo se permiten numeros")
        .required("Lo siento esto no es gratis, tienes que meter un precio")
        .min(0, "El precio ha de ser mayor que 0"),
      pages: yup
        .number("En este campo solo se permiten numeros")
        .required("¿Como pretendes registrar un libro si no lo presentas?")
        .min(
          0,
          "¿Que quieres entregar, la portada solamente? Añade mas de 0 paginas"
        ),
      state: yup
        .string(
          "¿Como te las has apañado para meter algo que no es un texto aqui?"
        )
        .required(
          "¿Por que no quieres meter el estado del libro?¿Que escondes?"
        )
        .matches(
          /(new|good|used|bad)/,
          "Oye, solo se puede seleccionar new,good,used,bad. ¿Como te las arreglaste para meter algo que no sea eso?"
        ),
      /*book: yup.string().test(`book-exist`, 'Lo siento, ya tienes un libro con este modulo presentado', async function (value) {
        const bookApi = await this.bExists(value);
        return (
          (value.id !== bookApi.id &&
            value.moduleCode === bookApi.moduleCode &&
            value.userId === bookApi.userId) ||
          createError({ path, message: 'Lo siento, ya tienes un libro con este modulo presentado' })
        );
      }),*/
    });
    return {
      book: {},
      bookSchema,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getBookId();
    }
  },
  watch: {
    $route(newValue, oldValue) {
      newValue.params.id !== oldValue.params.id ? this.getBookId() : {};
    },
  },
  computed: {
    ...mapState(useModulesStore, {
      modules: "modules",
    }),
    ...mapState(useBooksStore, {
      states: "states",
      getBook: "getBook",
      bExists: "bExists",
    }),
  },
  methods: {
    async addBooks() {
      try {
        this.book.userId = 5;
        if (this.checkExist()) {
          this.addMessage("error", "Ya tienes un libro con este modulo");
          throw new Error("dsfs");
        }
        if (!this.book.id) {
          await this.addBook(this.book);
        } else {
          await this.modBook(this.book);
        }
      } catch (error) {
        console.log(error);
      }
      this.book = {};
      this.$router.push({ path: "/list" });
    },
    controlForm() {
      if (!this.book.id) {
        this.book = {};
      } else {
        this.getBookId();
      }
    },
    async checkExist() {
      const bookApi = await this.bExists(this.book);
      return (
        this.book.id !== bookApi.id &&
        this.book.moduleCode === bookApi.moduleCode &&
        this.book.userId === bookApi.userId
      );
    },
    async getBookId() {
      this.book = await this.getBook(this.$route.params.id);
    },
    ...mapActions(useBooksStore, ["modBook", "addBook"]),
    ...mapActions(useMessageStore, ["addMessage"]),
  },
};
</script>
<template>
  <div id="form" class="page">
    <p v-if="!this.book.id">Añadir libro</p>
    <p v-else>Editar libro</p>
    <Form
      ref="bookForm"
      :v-model="book"
      :validation-schema="bookSchema"
      @submit="addBooks"
      @reset="controlForm"
    >
      <ErrorMessage class="errorM" name="book" />
      <div :class="{ hidden: !book.id }">
        <label for="id" id="label-id-book">Id:</label>
        <Field name="id" v-model.number="book.id" type="number" disabled />
      </div>
      <div>
        <label for="moduleCode">Módulo:</label>
        <Field
          as="select"
          name="moduleCode"
          class="form-control"
          v-model="book.moduleCode"
          required
        >
          <option default hidden value="">- Selecciona un módulo -</option>
          <option v-for="module in this.modules" :value="module.code">
            {{ module.cliteral }}
          </option>
        </Field>
        <br />
        <ErrorMessage class="errorM" name="moduleCode" />
      </div>
      <div>
        <label for="publisher">Editorial:</label>
        <Field name="publisher" v-model="book.publisher" type="text" required />
        <br />
        <ErrorMessage class="errorM" name="publisher" />
      </div>
      <div>
        <label for="price">Precio:</label>
        <Field
          name="price"
          v-model.number="book.price"
          type="number"
          min="0"
          step="0.01"
          required
        />
        <br />
        <ErrorMessage class="errorM" name="price" />
      </div>
      <div>
        <label for="pages">Páginas:</label>
        <Field
          name="pages"
          v-model.number="book.pages"
          type="number"
          min="0"
          step="1"
          required
        />
        <br />
        <ErrorMessage class="errorM" name="pages" />
      </div>
      <div id="status">
        <label>Estado:</label>
        <!-- Aquí poned un radiobutton para cada estado -->
        <label v-for="state in states">
          <Field
            name="state"
            :class="['state_' + state]"
            v-model="book.status"
            type="radio"
            :value="state"
            required
          />
          <span>{{ state }}</span>
        </label>
        <br />
        <ErrorMessage class="errorM" name="state" />
      </div>
      <div>
        <label for="comments">Comentarios:</label>
        <Field
          as="textarea"
          name="comments"
          v-model="book.comments"
          type="text"
          required
        />
        <br />
        <ErrorMessage class="errorM" name="comments" />
      </div>
      <button v-if="!book.id" type="submit">Añadir</button>
      <button v-else type="submit">Editar</button>
      <button type="reset">Reset</button>
    </Form>
  </div>
</template>
