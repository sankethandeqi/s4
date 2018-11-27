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
          <th>Actions</th>
        </tr>
        <tr v-for="(file, key, index) in files" :key="index">          
          <td>{{ file.name }}</td>
          <td>{{ bytesToSize(file.size) }}</td>
          <td>{{ file.created_at }}</td>
          <td>            
            <span class="badge badge-warning" v-if="!file.etag">Uploading</span>
            <span v-if="file.etag">{{ file.etag }}</span>
          </td>
          <td>
            <ul class="action-items">
              <li><a href="javascript:void(0);"><i class="fas fa-download"></i></a></li>
              <li><a href="javascript:void(0);" v-on:click="deleteFile(file, index)"><i class="fas fa-trash-alt"></i></a></li>
            </ul>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<style scoped>
.action-items {
  margin: 0;
  padding: 0;
  text-align: left;
}
.action-items li {
  display: inline-block;
  margin: 0 10px;
}
</style>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "home",
  created() {
    this.getAllFiles();
    this.clearNewlyAdded();
  },
  computed: {
    ...mapState({
      files: state => state.file.files,
      error: state => state.file.error
    })
  },
  methods: {
    bytesToSize: bytes => {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    },
    ...mapActions({
      getAllFiles: "file/getAllFiles",
      deleteFile: "file/deleteFile"
    }),
    ...mapMutations({
      clearNewlyAdded: "file/clearNewlyAdded"
    })
  }
};
</script>
