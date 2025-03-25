import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SignupView from "@/views/SignupView.vue";
import TripsView from "@/views/TripsView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: TripsView },
  { path: "/signup", component: SignupView },
  { path: "/login", component: LoginView },
  { path: "/me", component: ProfileView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  if (
    // make sure the user is authenticated
    !user.token &&
    // ❗️ Avoid an infinite redirect
    to.href !== "/login" &&
    to.href !== "/signup"
  ) {
    // redirect the user to the login page
    next("/login");
  }

  next();
});

export default router;
