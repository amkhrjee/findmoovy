import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/movies/:id",
      name: "Movie",
      component: () =>
        import(/*webpackChunkName: "movie"*/ "../views/Movie.vue"),
    },
    {
      path: "/watchlist",
      name: "Watchlist",
      component: () =>
        import(/*webpackChunkName: "watchlist"*/ "../views/WatchList.vue"),
    },
    {
      path: "/results/:name",
      name: "Results",
      component: () =>
        import(/*webpackChunkName: "movie"*/ "../views/Results.vue"),
    },
  ],
});

export default router;
