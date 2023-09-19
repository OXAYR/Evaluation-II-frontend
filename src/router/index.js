import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import HomeView from "@/views/userviews/HomeView.vue";
import CarListView from "@/views/userviews/CarListView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserAccount from "@/components/user/UserAccount.vue";
import EditUser from "@/components/user/EditUser.vue";

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
    component: UserLayout,
    children: [
      {
        path: "",
        name: "CarList",
        component: CarListView,
      },
      {
        path: "account",
        name: "Account",
        component: UserAccount,
      },
      {
        path: "account/:id",
        component: EditUser,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
