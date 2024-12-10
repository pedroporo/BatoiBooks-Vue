import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListView from "@/views/ListView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      name: "list",
      component: ListView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: PathNotFound
    },
    
  ],
});

export default router;
