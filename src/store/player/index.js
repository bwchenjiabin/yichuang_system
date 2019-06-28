export default {
  state: {
      // 用户id
    user_id: 1,
    // 商户id
    owner: 1
  },
  getters: {
    user_id: state => state.user_id,
    owner: state => state.owner
  },
  mutations: {
    'SET_USER_ID' (state, payload) {
      state.user_id = payload
    },
    'SET_OWNER' (state, payload) {
      state.owner = payload
    }
  },
  actions: {
    setUserId ({commit}, payload) {
      commit("SET_USER_ID", payload)
    },
    setOwner ({commit}, payload) {
      commit("SET_OWNER", payload)
    },
  }
}