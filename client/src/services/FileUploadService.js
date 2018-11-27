import axios from "axios";
const baseUrl = "http://127.0.0.1:3000/v1/files";

export default {
  getAll: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl)
        .then(data => {
          console.log("SUCCESS!!");
          console.log(data);
          resolve(data.data.data.files);
        })
        .catch(err => {
          console.log("FAILURE!!");
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
            "Content-Type": "multipart/form-data"
          }
        })
        .then(data => {
          console.log("SUCCESS!!");
          resolve(data);
        })
        .catch(err => {
          console.log("FAILURE!!");
          reject(err);
        });
    });
  }
};
