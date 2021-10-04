import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import env from '@/env.ts'
import PageTemplate from '../views/Page.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/:locale',
    component: PageTemplate,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      left: 0,
    }
  },
})

/* ========================================================================== *
* Router guard starts                                                         *
* -------------------------------------------------------------------------- */
router.beforeResolve(async (to, from, next?) => {
  return next()
})

export default router
