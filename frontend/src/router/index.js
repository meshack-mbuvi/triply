import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SignupView from "@/views/SignupView.vue";
import TripsView from "@/views/TripsView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./authGuard";

const routes = [
  { path: "/", component: TripsView, beforeEnter: authGuard },
  { path: "/signup", component: SignupView },
  { path: "/login", component: LoginView },
  { path: "/me", component: ProfileView, beforeEnter: authGuard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
