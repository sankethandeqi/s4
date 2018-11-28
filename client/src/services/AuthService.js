import Vue from "vue";
import axios from "axios";
const baseUrl = `${process.env.VUE_APP_ROOT_API}/auth`;

export default {
  verifyToken: token => {
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + "/verify-token", {
          token,
          socketId: Vue.prototype.$socketId
        })
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
