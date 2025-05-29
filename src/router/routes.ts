import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Index.vue') },
      { path: 'message', component: () => import('src/pages/Message.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/Login.vue') }],
  },
  {
    path: '/:catchAll',
    component: () => import('src/pages/Error.vue'),
  },
]

export default routes
