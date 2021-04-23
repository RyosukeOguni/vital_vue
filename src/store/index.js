import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/user'
import WeatherModule from './modules/weather'
import VitalModule from './modules/vital'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: UserModule,
    weather: WeatherModule,
    vital: VitalModule,
  },
})
