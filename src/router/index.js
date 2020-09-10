import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'Error 404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/secret',
    name: 'Secret',
    component: () => import('../views/Secret.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
