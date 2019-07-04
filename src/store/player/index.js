export default {
  state: {
      // 用户id
      ex2: 2,
  },
  getters: {
    ex2: state => state.ex2
  },
  mutations: {
    'SET_EX2' (state, payload) {
      state.ex2 = payload
    }
  },
  actions: {
    setEx2 ({commit}, payload) {
      commit("SET_EX2", payload)
    }
  }
}