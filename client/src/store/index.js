import Vue from "vue";
import Vuex from "vuex";
import AuthStore from "./AuthStore";
import FileStore from "./FileStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthStore,
    file: FileStore
  }
});
