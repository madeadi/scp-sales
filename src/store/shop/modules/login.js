const state = {
  loginVisible: false,
  modalComponent: null
}

const mutations = {
  LOGIN_SHOW (state, componentName) {
    state.loginVisible = true
    state.modalComponent = componentName
  },

  LOGIN_HIDE (state) {
    state.loginVisible = false
    state.modalComponent = null
  }
}

export default {
  state,
  mutations
}
