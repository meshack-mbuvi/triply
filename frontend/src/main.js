import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";
import Vue3Toastify from "vue3-toastify";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);

app.use(Vue3Toastify, {
  autoClose: 3000,
});

const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");
