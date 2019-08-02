import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userInfo: null
  },
  modules: {
  },
  mutations: {
    setUserInfo (state , data) {
      state.userInfo = data
    }
  }
})

export default store
