import { createStore } from "vuex";
import user from "./modules/user";
import reservations from "./modules/reservations";
import car from "./modules/car";

export default createStore({
  modules: {
    user,
    cart,
    car,
  },
});
