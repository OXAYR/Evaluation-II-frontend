import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../public/index.css";
import axios from "axios";

axios.defaults.baseURL='http://localhost:4000'

createApp(App).use(store).use(router).mount("#app");
