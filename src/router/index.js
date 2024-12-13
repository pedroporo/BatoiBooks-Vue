import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
//import ListView from "@/views/ListView.vue";
import BookList from "@/components/BookList.vue";
import PathNotFound from "@/components/PathNotFound.vue";
import AddBook from "@/components/AddBook.vue";
import AboutView from "../views/AboutView.vue";
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
    ,
    {
      path: "/addBook",
      name: "addBook",
      component: AddBook,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: AddBook,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PathNotFound,
    },
  ],
});

export default router;
