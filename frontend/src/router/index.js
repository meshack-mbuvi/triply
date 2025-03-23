import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import TripsView from "@/views/TripsView.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: TripsView },
  { path: "/signup", component: SignupView },
  { path: "/login", component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
