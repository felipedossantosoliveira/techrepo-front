import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BrandsView from '../views/BrandsView.vue'
import DevicesView from '../views/devices/DevicesView.vue'
import DeviceCreate from '../views/devices/DeviceCreate.vue'
import LoginView from '../views/auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/brands',
      name: 'brands',
      component: BrandsView
    },
    {
      path: '/devices',
      name: 'devices',
      component: DevicesView
    },
    {
      path: '/device/create',
      name: 'device-create',
      component: DeviceCreate
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    // {
      // path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
