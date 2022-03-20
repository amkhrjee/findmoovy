import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

// window.addEventListener("load", () => {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register(
//       "https://findmoovy.netlify.app/service-worker.js"
//     );
//   }
// });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register(
      "https://findmoovy.netlify.app/service-worker.js"
    );
  });
}
