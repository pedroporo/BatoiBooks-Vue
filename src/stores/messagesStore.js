import { defineStore } from "pinia";
import api from "./api.js";

export const useMessageStore = defineStore("messageStore", {
  state() {
    return {
      messages: [],
    };
  },
  actions: {
    addMessage(tipo, message) {
      this.state.messages.push({ tipo: tipo, message: message });
    },
    delMessage(index) {
      this.state.messages.splice(index, 1);
    },
  },
});
