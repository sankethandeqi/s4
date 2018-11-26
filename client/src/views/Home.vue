<template>
  <div class="container">
    <div class="alert alert-danger mt-5" v-if="error">Unexpected error occurred. Please try after some time.</div>
    <h3 class="mt-5 text-center">All your files</h3>    
    <table class="table mt-4">
      <thead>
        <tr>          
          <th>Key</th>
          <th>Size</th>
          <th>Uploaded On</th>
          <th>S3 ETag</th>
        </tr>
        <tr v-for="(file, index) in files" :key="index">          
          <td>{{ file.name }}</td>
          <td>{{ file.size }}</td>
          <td>{{ file.created_at }}</td>
          <td>            
            <span class="badge badge-warning" v-if="!file.etag">Uploading</span>
            <span v-if="file.etag">{{ file.etag }}</span>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import FileUploadService from "../services/FileUploadService";
export default {
  name: "home",
  data: function() {
    return {
      files: [],
      error: false
    };
  },
  created() {
    FileUploadService.getAll()
      .then(files => {
        this.files = files;
      })
      .catch(err => {
        alert("Unexpected error occurred");
        console.log(err);
        this.error = true;
      });
  }
};
</script>
