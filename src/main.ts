import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./common/styles/elementui";
// import category from "@/model/cateEleme";
// import dataItem from "@/model/dataItem";
// import dataAction from "@/store/dataAction";
// let newItem = new dataItem(1,category.life,"做饭","看着菜谱一边做一边吃，啊哈哈哈");
// new dataAction().addData(newItem)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
