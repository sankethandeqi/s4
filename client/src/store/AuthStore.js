import AuthService from "../services/AuthService";
export default {
  namespaced: true,
  state: {
    sending: false,
    email: undefined,
    step: "login",
    hash: undefined,
    emailRegistrationErrors: [],
    checkEmailErrors: [],
    OTPErrors: [],
    toast: {}
  },
  mutations: {
    updateEmail(state, data) {
      state.email = data.email;
    },
    updateStep(state, data) {
      state.step = data.step;
    },
    updateEmailRegistrationErrors(state, data) {
      state.emailRegistrationErrors = data.emailRegistrationErrors;
    },
    updateCheckEmailErrors(state, data) {
      state.checkEmailErrors = data.checkEmailErrors;
    },
    updateOTPErrors(state, data) {
      state.OTPErrors = data.OTPErrors;
    },
    updateSending(state, status) {
      state.sending = status;
    },
    updateHash(state, data) {
      state.hash = data.hash;
    },
    updateToast(state, toast) {
      state.toast = toast;
    }
  },
  actions: {
    sendOTP({ commit, state }) {
      commit("updateSending", true);
      AuthService.sendOTP(state.email)
        .then(
          response => {
            commit("updateStep", { step: "enter-otp" });
            commit("updateHash", { hash: response.hash });
          },
          error => {
            if (error.response && [400, 422].includes(error.response.status)) {
              const _OTPErrors = [];
              error.response.data.error.map(eObj => {
                _OTPErrors.push(eObj.message);
              });
              commit("updateOTPErrors", {
                OTPErrors: _OTPErrors
              });
            } else {
              commit("updateToast", {
                type: "error",
                title: "Something went wrong",
                body: `${error.message}`
              });
            }
          }
        )
        .then(() => commit("updateSending", false));
    },
    registerEmail({ commit, state }) {
      commit("updateSending", true);
      AuthService.registerEmail(state.email)
        .then(
          () => {
            commit("updateStep", { step: "otp" });
          },
          error => {
            if (error.response && [400, 422].includes(error.response.status)) {
              const _emailRegistrationErrors = [];
              error.response.data.error.map(eObj => {
                _emailRegistrationErrors.push(eObj.message);
              });
              commit("updateEmailRegistrationErrors", {
                emailRegistrationErrors: _emailRegistrationErrors
              });
            } else {
              commit("updateToast", {
                type: "error",
                title: "Something went wrong",
                body: `${error.message}`
              });
            }
          }
        )
        .then(() => commit("updateSending", false));
    },
    verifyOTP() {},
    checkIfEmailRegistered({ commit, state }) {
      commit("updateSending", true);
      commit("updateCheckEmailErrors", { checkEmailErrors: [] });

      AuthService.checkIfEmailRegistered(state.email)
        .then(
          isRegistered => {
            const step = isRegistered ? "enter-password" : "accept-terms";
            commit("updateStep", { step });
          },
          error => {
            if (error.response && [400, 422].includes(error.response.status)) {
              const _checkEmailErrors = [];
              error.response.data.error.map(eObj => {
                _checkEmailErrors.push(eObj.message);
              });
              commit("updateCheckEmailErrors", {
                checkEmailErrors: _checkEmailErrors
              });
            } else {
              commit("updateToast", {
                type: "error",
                title: "Something went wrong",
                body: `${error.message}`
              });
            }
          }
        )
        .then(() => commit("updateSending", false));
    }
  }
};
