import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import HomeView from "@/views/userviews/HomeView.vue";
import CarListView from "@/views/userviews/CarListView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserAccount from "@/components/user/UserAccount.vue";
import EditUser from "@/components/user/EditUser.vue";
import BookACar from "@/components/user/BookACar.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AddCar from "@/components/admin/AddCar.vue";
import AdminCarListView from "@/views/adminviews/AdminCarListView.vue";
import EditCar from "@/components/admin/EditCar.vue";

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
      {
        path: "reserve/:carId",
        component: BookACar,
      },
    ],
  },

  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "AddCar",
        component: AddCar,
      },
      {
        path: "admincars",
        name: "adminCarList",
        component: AdminCarListView,
      },
      {
        path: "admin/admincars/edit/:id",
        component: EditCar,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
