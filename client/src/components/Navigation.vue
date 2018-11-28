<template>
  <nav class="navbar navbar-expand-sm primary-nav bg-blue text-white">
    <div class="container">
      <router-link to="/" class="nav-item">
        <a class="navbar-brand" style="color: #fff">
          Share to S3
        </a>
      </router-link>      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" v-if="user.id">
        <ul class="navbar-nav ml-auto">
          <router-link to="/" class="nav-item dropdown" tag="li" active-class="active" exact>
            <a class="nav-link">
              All
              <span class="badge badge-danger" v-if="Object.keys(newlyUploaded).length">{{ Object.keys(newlyUploaded).length }}</span>
            </a>
            <div class="dropdown-menu show p-2" v-if="Object.keys(newlyUploaded).length" aria-labelledby="navbarDropdown">
              Below files have been modified recently.
              
                <dd v-for="(file, id) in newlyUploaded" :key="id">
                  <i class="fas fa-trash-alt text-danger" v-if="file.action == 'DELETE'"></i> 
                  <i class="fas fa-plus text-success" v-if="file.action == 'UPLOAD'"></i>
                  <strong> {{ file.name }}</strong>
                </dd>
              
              <router-link to="/">Click</router-link> here to view updated list.
            </div>
          </router-link>
          <router-link to="/upload" class="nav-item" tag="li" active-class="active" exact><a class="nav-link">Upload</a></router-link>          
        </ul>
      </div>
      
      <div class="media" v-if="user.id">
        <img v-bind:src="user.imageUrl" width="36" height="36" class="rounded mr-2 mt-1 ml-3" />
        <div class="media-body">
          <div>
            {{ user.name }}<br/>
            <small>{{ user.email }}</small>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dropdown-menu {
  width: 250px !important;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "Navigation",
  props: {
    active: String
  },
  computed: {
    ...mapState({
      newlyUploaded: state => {
        return state.file.newlyUploaded;
      },
      user: state => {
        return {
          id: state.auth.id,
          name: state.auth.name,
          email: state.auth.email,
          imageUrl: state.auth.imageUrl
        };
      }
    })
  }
};
</script>
