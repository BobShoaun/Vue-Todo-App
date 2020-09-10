import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '*',
    name: 'Error 404',
    component: () => import('../views/404.vue')
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
