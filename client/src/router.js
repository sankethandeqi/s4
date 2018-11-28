import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Upload from "./views/Upload.vue";
import Login from "./views/Login.vue";
import store from "./store/index";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/upload",
      name: "upload",
      component: Upload
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.state.auth.id) {
    return next();
  }
  // localStorage.setItem("token","some string");
  console.log("localStorage.getItem('jwt')", localStorage.getItem("token"));
  console.log("** Routes to **", to);
  console.log("** Routes to **", from);
  console.log("** Routes to **", next);
  if (to.meta && to.meta.guest) {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
