import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/pokemonChoice",
    name: "pokemonChoice",
    component: () => import("../views/PokemonView.vue"),
  },
  {
    path: "/tournament",
    name: "tournament",
    component: () => import("../views/TournamentView.vue"),
  },
  {
    path: "/battle",
    name: "battle",
    component: () => import("../views/BattleView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
