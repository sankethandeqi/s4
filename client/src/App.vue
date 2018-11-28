<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import store from "./store/index";
import Vue from "vue";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

socket.on("connect", function() {
  Vue.prototype.$socketId = socket.id;
});
socket.on("S3_EVENT", data => {
  console.log("data from S3 event delete");
  console.log(data);
  if (data.action == "DELETE") {
    store.commit("file/updateNewlyUploaded", data);
  } else if (data.action == "UPLOAD") {
    store.commit("file/updateNewlyUploaded", data);
  }
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
