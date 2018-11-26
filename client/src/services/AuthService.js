import axios from "axios";

export default {
  checkIfEmailRegistered: email => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_ROOT_API + "/auth/check-email", {
          email
        })
        .then(response => {
          resolve(response.data.data.exists);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  sendOTP: email => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_ROOT_API + "/auth/send-otp", {
          email
        })
        .then(response => {
          resolve(response.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  registerEmail: email => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_ROOT_API + "/auth/register-email", {
          email
        })
        .then(response => {
          resolve(response.data.data.status);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
