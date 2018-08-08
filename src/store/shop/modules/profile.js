const state = {
  data: {
    email: '',
    password: ''
  }
}

const mutations = {
  RECEIVE_PROFILE (state, profile) {
    state.data = profile
  },

  SUCCESSFUL_LOGIN (state, email, password) {
    state.data.email = email
    state.data.password = password
  },

  REGISTER (state, profile) {
    state.data.email = profile.email
    state.data.password = profile.password
  },

  LOGOUT (state) {
    state.data.email = ''
    state.data.password = ''
  },

  UPDATE_EMAIL (state, email) {
    state.data.email = email
  },

  UPDATE_PASSWORD (state, password) {
    state.data.password = password
  },

  TOGGLE_COUPON (state, coupon) {
    const couponLimitId = 4

    if (coupon.id !== couponLimitId) return

    if (!coupon.active) {
      state.data.limit += 100
    } else {
      state.data.limit -= 100
    }
  }
}

export default {
  state,
  mutations
}
