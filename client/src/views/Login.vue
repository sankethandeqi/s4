<template>
  <div class="container">    
    <div class="mt-5" v-if="!id">
      <div class="form-group text-center">
        <h4>Click button below to login with your Google Account</h4>
        <button
          class="btn btn-lg btn-light border mt-3"
          id="google-sign-in-button"
          :disabled="sending"
          >
          <img src="https://developers.google.com/identity/images/g-logo.png" width="28" />
          Sign in Using Google
          <i v-if="sending" class="fas fa-circle-notch fa-spin"></i>
        </button>
      </div>
    </div>
    
    <div class="mt-5 text-center" v-if="id">
      <h4>Successfully logged in <i class="fas fa-check text-success ml-1"></i></h4>
      <p class="text-muted lead">If this is the first time you have logged in then<br/> start <router-link to="/upload">uploading</router-link> some files.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "home",
  data: function() {
    return {
      error: false
    };
  },
  mounted() {
    console.log("process.env.VUE_APP_GOOGLE_CLIENT_ID");
    console.log(process.env.VUE_APP_GOOGLE_CLIENT_ID);

    // We are delibarately calling setUpGoogleLogin after 2 seconds
    // Reason is that we are getting window undefined if we do without this
    // TODO - Fix this
    setTimeout(this.setUpGoogleLogin(), 2000);
  },
  computed: {
    ...mapState({
      sending: state => state.auth.sending,
      id: state => state.auth.id
    })
  },
  methods: {
    setUpGoogleLogin() {
      window.gapi.load("auth2", () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        const auth2 = window.gapi.auth2.init({
          client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
          cookiepolicy: "single_host_origin"
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        auth2.attachClickHandler(
          document.getElementById("google-sign-in-button"),
          {},
          googleUser => {
            const profile = googleUser.getBasicProfile();
            console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log("Name: " + profile.getName());
            console.log("Image URL: " + profile.getImageUrl());
            console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
            console.log("Email: " + googleUser.getAuthResponse().id_token);
            this.verifyToken(googleUser.getAuthResponse().id_token);
          },
          error => {
            //alert(JSON.stringify(error, undefined, 2));
            console.log(error);
            this.error = true;
          }
        );
      });
    },
    ...mapActions({
      verifyToken: "auth/verifyToken"
    })
  }
};
</script>
