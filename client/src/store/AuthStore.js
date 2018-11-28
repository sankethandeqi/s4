import AuthService from "../services/AuthService";
export default {
  namespaced: true,
  state: {
    sending: false,

    token: undefined,
    email: undefined,
    name: undefined,
    imageUrl: undefined,
    id: 0,
    loginErrors: []
  },
  mutations: {
    updateSending(state, status) {
      state.sending = status;
    },
    resetLoginErrors(state) {
      state.loginErrors = [];
    },
    setLoginErrors(state, errorList) {
      state.loginErrors = errorList;
    },
    updateUserDetails(state, userDetails) {
      state.email = userDetails.email;
      state.name = userDetails.name;
      state.imageUrl = userDetails.imageUrl;
      state.token = userDetails.token;
      state.id = userDetails.id;
    }
  },
  actions: {
    verifyToken({ commit }, token) {
      commit("updateSending", true);
      commit("resetLoginErrors");
      AuthService.verifyToken(token)
        .then(
          userDetails => {
            console.log("response from verifyToken");
            console.log(userDetails);
            commit("updateUserDetails", userDetails);
          },
          error => {
            console.log(error);
            commit("resetLoginErrors", ["Unexpected error occurred."]);
          }
        )
        .then(() => {
          commit("updateSending", false);
        });
    }
  }
};
