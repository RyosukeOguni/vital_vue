import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
  },
  {
    path: '/vital',
    name: 'Vital',
    component: () => import('../views/Vital.vue'),
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('../views/Weather.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
