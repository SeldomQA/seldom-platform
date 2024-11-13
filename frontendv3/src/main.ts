import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, routes } from "./router";
import { store } from './store/index';

const app = createApp(App);
const router = createRouter();
app.use(router);
app.use(store);
app.mount("#app");
