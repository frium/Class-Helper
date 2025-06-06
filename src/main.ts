import { createSSRApp } from "vue";
import uviewPlus from 'uview-plus'
import App from "./App.vue";
import pinia from "./stores";
import './styles/common.scss'
export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.use(pinia);
  return {
    app,
  };
}
