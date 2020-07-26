import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/common/styles/elementui";
import "@/common/styles/editElementui/index.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
