import Vue from 'vue'
import Vuex from 'vuex'
import UsersModule from './modules/users'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users: UsersModule,
  },
})
