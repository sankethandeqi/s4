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
  
      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav ml-auto">
          <router-link to="/" class="nav-item dropdown" tag="li" active-class="active" exact>
            <a class="nav-link">
              All
              <span class="badge badge-danger" v-if="Object.keys(newlyUploaded).length">{{ Object.keys(newlyUploaded).length }}</span>
            </a>
            <div class="dropdown-menu show p-2" v-if="Object.keys(newlyUploaded).length" aria-labelledby="navbarDropdown">
              Below files have been added recently.
              <ul>
                <li v-for="(file, id) in newlyUploaded" :key="id">
                  <strong>{{ file.name }}</strong>
                </li>
              </ul>
              <router-link to="/">Click</router-link> here to view updated list.
            </div>
          </router-link>
          <router-link to="/upload" class="nav-item" tag="li" active-class="active" exact><a class="nav-link">Upload</a></router-link>          
        </ul>
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
      }
    })
  }
};
</script>
