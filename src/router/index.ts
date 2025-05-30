import { defineRouter } from '#q-app/wrappers'
// import { useUserStore } from 'stores/user'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import routes from './routes'

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Router.beforeEach((to, from, next) => {
  //   const userStore = useUserStore()

  //   const publicPages = ['/login']
  //   const authRequired = !publicPages.includes(to.path)

  //   if (authRequired && !userStore.isAuthenticated) {
  //     return next('/login')
  //   }

  //   next()
  // })

  return Router
})
