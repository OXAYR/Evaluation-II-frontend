import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import HomeView from "@/views/userviews/HomeView.vue";
import CarListView from "@/views/userviews/CarListView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import AccountSettings from "@/components/user/UserAccount.vue";
import EditUser from "@/components/user/EditUser.vue";
import BookACar from "@/components/user/BookACar.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AddCar from "@/components/admin/AddCar.vue";
import AdminCarListView from "@/views/adminviews/AdminCarListView.vue";
import Reservations from "@/components/user/Reservations.vue";
import Users from "@/components/admin/Users.vue";
import AllReservations from "@/components/admin/AllReservations.vue";
import OwnerAllReservations from "@/components/owner/OwnerAllReservations.vue";
import OwnerDashboard from "@/views/ownerviews/OwnerDashBoardView.vue";
import DashBoardView from "@/views/adminviews/ManagerDashBoardView.vue";
import OwnerUsers from "@/components/owner/OwnerUsers.vue";
import OwnerCarListView from "@/views/ownerviews/OwnerCarListView.vue";

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
    meta: {
      adminAuth: false,
      ownerAuth: false,
      requiresAuth: true,
      userAuth: true,
    },
  },
  {
    path: "/home/user",
    name: "Home",
    component: UserLayout,
    meta: {
      adminAuth: false,
      ownerAuth: false,
      requiresAuth: true,
      userAuth: true,
    },
    children: [
      {
        path: "",
        name: "CarList",
        component: CarListView,
      },
      {
        path: "cars",
        name: "cars",
        component: CarListView,
      },
      {
        path: "account",
        name: "Account",
        component: AccountSettings,
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
    meta: {
      adminAuth: true,
      ownerAuth: false,
      requiresAuth: true,
      userAuth: false,
    },
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
        path: "account",
        name: "managerAccount",
        component: AccountSettings,
      },
      {
        path: "account/:id",
        component: EditUser,
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
    meta: {
      adminAuth: false,
      ownerAuth: true,
      requiresAuth: true,
      userAuth: false,
    },
    children: [
      {
        path: "",
        name: "ownerDashboard",
        component: OwnerDashboard,
      },
      {
        path: "vehicles",
        name: "ownercarlist",
        component: OwnerCarListView,
      },
      {
        path: "account",
        name: "OwnerAccount",
        component: AccountSettings,
      },
      {
        path: "users",
        name: "owner users",
        component: OwnerUsers,
      },
      {
        path: "account/:id",
        name: "edit owner account",
        component: EditUser,
      },
      {
        path: "bookings",
        name: "owner bookings",
        component: OwnerAllReservations,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("userAuth"));
    console.log("in the navigation guards------>", user.userRole);

    if (!user || !token) {
      next({ name: "login" });
    } else if (to.meta.adminAuth) {
      if (user.userRole.toLowerCase() === "manager") {
        next();
      } else {
        next("/home");
      }
    } else if (to.meta.ownerAuth) {
      if (user.userRole.toLowerCase() === "owner") {
        next();
      } else {
        next("/manager");
      }
    } else if (to.meta.userAuth) {
      if (user.userRole.toLowerCase() === "user") {
        next();
      } else {
        console.log("I am in admin");
        next("/owner");
      }
    }
  } else {
    next();
  }
});

export default router;
