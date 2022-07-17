import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/publish'
  },
  {
    path: '/publish',
    component: () => import('../view/publish/publish.vue')
  },
  {
    path: '/publish/address',
    component: () => import('../view/publish/address.vue')
  },
  {
    path: '/publish/detail',
    component: () => import('../view/publish/detail.vue')
  },
  {
    path: '/publish/join',
    component: () => import('../view/publish/join.vue')
  },
  {
    path: '/publish/time',
    component: () => import('../view/publish/time.vue')
  },
  {
    path: '/publish/other',
    component: () => import('../view/publish/other.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
