<template>
  <div id="app">
    <Navigation />
    <router-view/>
    <toast-container :toastConfig="customToastConfig"></toast-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "@/components/Navigation.vue";
export default {
  name: "HelloWorld",
  components: {
    Navigation
  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "./assets/css/main.css";
</style>
