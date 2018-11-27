<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Vue from "vue";
import io from "socket.io-client";
const socket = io("http://localhost:3000");
socket.on("connect", function() {
  Vue.prototype.$socketId = socket.id;
});
socket.on("UPLOADED_S3", function(data) {
  // TODO - Move this to VUEX
  console.log(data);
});
export default {
  name: "Main",
  components: {
    Navigation
  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "./assets/css/main.css";
</style>
