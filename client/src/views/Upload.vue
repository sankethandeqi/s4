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
            <th>Status</th>
            <th>Actions</th>
          </tr>
          <tr class="text-muted bg-error" v-bind:class="{'table-danger': filesStatus[index] == 'Error'}" v-for="(file, index) in files" :key="index">
            <td>
              <img v-if="isImage(file)" v-bind:src="getFilePreview(file)" width="50" height="50" class="rounded" />
              <i v-if="!isImage(file)" v-bind:class="getFileTypeClass(file)"></i>
            </td>
            <td><strong class="text-gray-dark">{{file.name}}</strong></td>
            <td><span class="d-block">{{file.type}}</span></td>
            <td>
              <span
                class="badge badge-primary"
                v-bind:class="{
                  'badge-success': filesStatus[index] == 'Sent',
                  'badge-danger': filesStatus[index] == 'Error',
                  'badge-primary': filesStatus[index] == 'Sending',
                  'badge-secondary': filesStatus[index] == 'No Action',
                }"
                v-bind:title="getTooltipTitle(index)"
                >
                {{filesStatus[index]}}
              </span>
            </td>
            <td>
              <a href="#" v-if="filesStatus[index] == 'No Action'" v-on:click="removeFile(index)"><i class="fas fa-trash-alt"></i></a>
              <i v-if="filesStatus[index] == 'Sent'" class="fas fa-check text-success"></i>
              <i v-if="filesStatus[index] == 'Sending'" class="fas fa-circle-notch fa-spin"></i>
              <button
                v-if="filesStatus[index] == 'Error'"
                v-on:click="uploadSingleFile(index)"
                class="btn btn-light border"
                >
                Try again <i class="fas fa-file-upload"></i>
              </button>
            </td>            
          </tr>
          <tr v-if="!attempted">
            <td colspan="5">
              <small class="d-block text-right mt-3">
                <a href="javascript:void(0);" v-on:click="resetFiles" style="color: red;">Click here to cancel</a>
              </small>
            </td>
          </tr>
        </table>
        <button
          class="btn btn-light border btn-lg mt-3 mb-5"
          v-on:click="uploadFiles"
          v-if="!attempted"
          :disabled="uploading"
          >
            Start Uploading
            <i class="fas fa-file-upload"></i>
        </button>
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
      files: [],
      filesStatus: [],
      uploading: false,

      // if atleast one attempt is made this will be set to true
      attempted: false
    };
  },
  methods: {
    handleFileUpload() {
      this.files = this.$refs.file.files;
      for (let i = 0; i < this.files.length; i++) {
        this.filesStatus[i] = "No Action";
      }
    },

    resetFiles() {
      this.files = [];
      this.filesStatus = [];
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

    setFileStatus(index, status) {
      const filesStatus = [...this.filesStatus];
      filesStatus[index] = status;
      this.filesStatus = filesStatus;
    },

    uploadSingleFile(index) {
      const file = this.files[index];
      this.setFileStatus(index, "Sending");
      FileUploadService.uploadFiles(file)
        .then(() => {
          this.setFileStatus(index, "Sent");
        })
        .catch(() => {
          this.setFileStatus(index, "Error");
        })
        .finally(() => {
          this.uploading = false;
        });
    },

    removeFile(index) {
      const files = [...this.files];
      const filesStatus = [...this.filesStatus];
      files.splice(index, 1);
      filesStatus.splice(index, 1);
      this.files = files;
      this.filesStatus = filesStatus;
    },

    uploadFiles() {
      if (this.uploading) return;

      this.attempted = true;
      this.uploading = true;
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        this.setFileStatus(i, "Sending");
        FileUploadService.uploadFiles(file, this.$socketId)
          .then(() => {
            this.setFileStatus(i, "Sent");
          })
          .catch(() => {
            this.setFileStatus(i, "Error");
          })
          .finally(() => {
            this.uploading = false;
          });
      }
    },

    getTooltipTitle(index) {
      const status = this.filesStatus[index];
      if (status == "No Action") {
        return "Click button below to start uploading";
      }
      if (status == "Sending") {
        return "File is being uploaded";
      }
      if (status == "Sent") {
        return "File is uploaded and queued to send to S3";
      }
      if (status == "Error") {
        return "Unexpected error occurred. You can try to upload this file again by clicking button to the right.";
      }
    }
  }
};
</script>
