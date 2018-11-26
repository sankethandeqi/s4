<template>
  <div class="container">
    <div class="text-center">
      
      <div v-if="files.length">
        <h3 class="mt-5">Choose Files to Upload</h3>
        <table class="table mt-5">
          <tr>
            <th>Preview</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>Actions</th>
          </tr>
          <tr class="text-muted" v-for="(file, index) in files" :key="index">
            <td>
              <img v-if="isImage(file)" v-bind:src="getFilePreview(file)" width="50" height="50" class="rounded" />
              <i v-if="!isImage(file)" v-bind:class="getFileTypeClass(file)"></i>
            </td>
            <td><strong class="text-gray-dark">{{file.name}}</strong></td>
            <td><span class="d-block">{{file.type}}</span></td>
            <td><a href="#"><i class="fas fa-trash-alt"></i></a></td>
          </tr>
          <tr>
            <td colspan="4">
              <small class="d-block text-right mt-3">
                <a href="javascript:void(0);" v-on:click="resetFiles" style="color: red;">Click here to cancel</a>
              </small>
            </td>
          </tr>
        </table>
        <button class="btn btn-light border btn-lg mt-3 mb-5" v-on:click="uploadFile">Start Uploading <i class="fas fa-file-upload"></i></button>
      </div>
      
      <section v-if="!files.length">
        <h3 class="mt-5">Select files from your local drive to upload</h3>
        <label class="btn btn-lg btn-light border mt-3">
          Select files to upload
          <i class="fas fa-cloud-upload-alt"></i>
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload" style="display: none;" multiple/>
        </label>
      </section>
      
    </div>
  </div>
</template>

<script>
import FileUploadService from "../services/FileUploadService";
export default {
  data() {
    return {
      files: []
    };
  },
  methods: {
    handleFileUpload() {
      this.files = this.$refs.file.files;
      console.log(this.files);
    },
    resetFiles() {
      this.files = [];
    },
    getFilePreview(file) {
      return window.URL.createObjectURL(file);
    },
    isImage(file) {
      return file.name.match(/.(jpg|jpeg|png|gif)$/i);
    },
    getFileTypeClass(file) {
      const classList = ["fas", "fa-3x"];
      if (file.name.match(/.(pdf)$/i)) {
        classList.push("fa-file-pdf");
      } else if (file.name.match(/.(docx|doc)$/i)) {
        classList.push("fa-file-word");
      } else if (file.name.match(/.(zip|gz|rar)$/i)) {
        classList.push("fa-file-archive");
      } else {
        classList.push("fa-file-alt");
      }
      return classList.join(" ");
    },
    uploadFile() {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        FileUploadService.uploadFiles(file)
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log("Error occurred");
            console.log(err);
          });
      }
    }
  }
};
</script>
