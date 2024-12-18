import { defineStore } from "pinia";
import api from "./api.js";

export const useModulesStore = defineStore("modulesStore", {
  state() {
    return {
      modules: [],
    };
  },
  getters: {
    getModule: (state) => (moduleCode) =>
      state.modules.find((module) => module.code == moduleCode)??{},
  },
  actions: {
    async populateModules() {
      try {
        const response = await api.modules.getAll();
        this.modules = response.data;
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
  },
});
