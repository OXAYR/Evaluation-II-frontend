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
import Reservations from "@/components/user/Reservations.vue";
import Users from "@/components/admin/Users.vue";
import AllReservations from "@/components/admin/AllReservations.vue";
import OwnerDashboard from "@/views/ownerviews/OwnerDashBoardView.vue";
import DashBoardView from "@/views/adminviews/ManagerDashBoardView.vue";
import OwnerUsers from "@/components/owner/OwnerUsers.vue";

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
    component: HomeView,
  },
  {
    path: "/home/user",
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
      {
        path: "reservations",
        component: Reservations,
      },
      {
        path: "editreservation/:reservationId",
        component: BookACar,
      },
    ],
  },

  {
    path: "/manager",
    name: "admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "managerDashboardHome",
        component: DashBoardView,
      },
      {
        path: "vehicles",
        name: "managerCarList",
        component: AdminCarListView,
      },
      {
        path: "vehicles/edit/:id",
        component: AddCar,
      },
      {
        path: "users",
        component: Users,
      },
      {
        path: "bookings",
        component: AllReservations,
      },
    ],
  },

  {
    path: "/owner",
    name: "owner",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "ownerDashboard",
        component: OwnerDashboard,
      },
      {
        path: "vehicles",
        name: "ownercarlist",
        component: AdminCarListView,
      },
      {
        path: "users",
        component: OwnerUsers,
      },
      {
        path: "bookings",
        component: AllReservations,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
