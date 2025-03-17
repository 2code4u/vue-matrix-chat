import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/auth',
      name: 'authorization',
      component: () => import(/* webpackChunkName: "Authorization" */ '@/views/AuthView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach(async(to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = await authStore.authCheck()

  if (to.name !== 'authorization' && !isAuthenticated) {
    next({ name: 'authorization' })
  } else next()
})

export default router
