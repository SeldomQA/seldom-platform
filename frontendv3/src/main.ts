import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, routes } from "./router";

const app = createApp(App);
const router = createRouter();
app.use(router);
app.mount("#app");
