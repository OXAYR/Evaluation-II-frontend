import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import HomeView from "@/views/userviews/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
