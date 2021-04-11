import auth from '@/api/auth';

export default {
  state: {
    user: null,
    isLogin: false
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
    },

    setLogin(state, payload) {
      state.isLogin = payload.isLogin
    }
  },
  actions: {
    login({commit}, {username, password}) {
      return auth.login({username, password})
        .then(res => {
          commit('setUser', {user: res.data})
          commit('setLogin', {isLogin: true})
        })
    },

    async register({commit}, {username, password}) {
      let res = await auth.register({username, password})
      commit('setUser', {user: res.data})
      commit('setLogin', {isLogin: true})
    },

    async checkLogin({commit, state}) {
      if (state.isLogin) return true
      let res = await auth.getInfo()
      commit('setLogin', {isLogin: res.isLogin})
      if (!res.isLogin) return false
      commit('setUser', {user: res.data})
      return true
    },

    async logout({commit}) {
      await auth.logout()
      commit('setLogin', {isLogin: false})
      commit('setUser', {user: null})
    }
  }
}
