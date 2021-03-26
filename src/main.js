import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// bootstrap-vueを読込
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// vue-paginateを読込
import VuePaginate from 'vue-paginate'
Vue.use(VuePaginate)

Vue.config.productionTip = false
// ブラウザのデベロッパーを許可
Vue.config.devtools = true
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
