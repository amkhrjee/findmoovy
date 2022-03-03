import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Movie from "../views/Movie.vue";
import Results from "../views/Results.vue";
import WatchList from "../views/WatchList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movies/:id",
      name: "Movie",
      component: Movie,
    },
    {
      path: "/watchlist",
      name: "Watchlist",
      component: WatchList,
    },
    {
      path: "/results",
      name: "Results",
      component: Results,
    },
  ],
});

export default router;
