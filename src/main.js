import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../service-worker.js");
  }
});
