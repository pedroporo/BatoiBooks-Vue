<script>
import { store } from "@/stores/store";
export default {
  name: "AppMessages",
  computed: {
    messages() {
      return store.state.messages;
    },
  },
  methods: {
    delMessage(index) {
      store.delMessage(index,1);
    },
  },
};
</script>
<template>
  <div id="messages">
    <div
      v-for="(message, index) in messages"
      role="alert"
      :key="index"
      :class="message.tipo"
      :index="index"
      alert
      alert-danger
      alert-dismissible
    >
      {{ message.message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        :key="index"
        :index="index"
        @click="delMessage"
      >
        x
      </button>
    </div>
  </div>
</template>
