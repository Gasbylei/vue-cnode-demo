import Vue from 'vue'
import Vuex from 'vuex'
import ls from '@/plugins/localStorage'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: ls.getItem('userinfo') && ls.getItem('userinfo') || {},
    // 添加 auth 来保存当前用户的登录状态
    auth: ls.getItem('auth'),
  },

  mutations: {
    UPDATE_USER(state, userinfo) {
      state.userinfo = userinfo
      ls.setItem('userinfo', userinfo)
    },
    // 添加 UPDATE_AUTH 来更改当前用户的登录状态
    UPDATE_AUTH(state, auth) {
      state.auth = auth
      ls.setItem('auth', auth)
    },
  },

  actions: {
    login({ commit }, userinfo) {
      if (userinfo) 
      commit('UPDATE_USER', userinfo)
      // 更新当前用户的登录状态为已登录
      commit('UPDATE_AUTH', true)
    },
    logout({ commit }) {
      commit('UPDATE_AUTH', false)
      //删除用户信息
      ls.removeItem('userinfo')
      commit('UPDATE_USER', ls.getItem('userinfo'))
      router.push({ name: 'home', params: { logout: true } })
    },
  }

})
