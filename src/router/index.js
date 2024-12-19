import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookList from "@/components/BookList.vue";
import PathNotFound from "@/components/PathNotFound.vue";
import AddBook from "@/components/AddBook.vue";
import AboutView from "../views/AboutView.vue";
import AddCart from "@/components/AddCart.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: BookList,
    },
    {
      path: "/list",
      name: "list",
      component: BookList,
    },
    {
      path: "/addBook",
      name: "addBook",
      component: AddBook,
    },
    {
      path: "/cart",
      name: "carrito",
      component: AddCart,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: AddBook,
      props: true,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PathNotFound,
    },
  ],
});

export default router;
