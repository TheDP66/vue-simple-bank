import Antd, { Button } from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia).use(router).use(Button).use(Antd).mount("#app");
