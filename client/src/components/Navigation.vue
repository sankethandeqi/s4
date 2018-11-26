<template>
  <nav class="navbar navbar-expand-sm primary-nav bg-blue text-white">
    <div class="container">
      <a class="navbar-brand" href="#" style="color: #fff">
        Share to S3
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav ml-auto">
          <router-link to="/" class="nav-item" tag="li" active-class="active" exact><a class="nav-link">All</a></router-link>
          <router-link to="/upload" class="nav-item" tag="li" active-class="active" exact><a class="nav-link">Upload</a></router-link>          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    active: String
  }
};
</script>
