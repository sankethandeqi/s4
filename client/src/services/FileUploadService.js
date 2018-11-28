import axios from "axios";
import store from "../store/index";
//const baseUrl = "http://127.0.0.1:3000/v1/files";
const baseUrl = `${process.env.VUE_APP_ROOT_API}/files`;

export default {
  getAll: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl, {
          headers: {
            token: store.state.auth.token
          }
        })
        .then(data => {
          resolve(data.data.data.files);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  uploadFiles: (file, socketId) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("resource", file);
      formData.append("socketId", socketId);
      axios
        .post(baseUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: store.state.auth.token
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete: id => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${baseUrl}/${id}`, {
          headers: {
            token: store.state.auth.token
          }
        })
        .then(data => {
          resolve(data.data.success);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
