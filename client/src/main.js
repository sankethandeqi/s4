import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
// Uncomment below line if using Bootstrap JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
