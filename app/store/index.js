import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import login from './login'
import menu from './menu'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    login,
    menu
  },
  strict: debug
})