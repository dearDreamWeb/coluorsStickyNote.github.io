import Vue from "vue";
import Vuex from "vuex";
import DataAction from "./dataAction";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataAction: new DataAction(),
  },
});
