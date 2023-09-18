import { createStore } from 'vuex';
import user from './modules/user';
import cart from './modules/reservations';
import movies from './modules/car';

export default createStore({
  modules: {
    user,
    cart,
    movies,
  },
});
