import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/Home/index.vue')
    },
    {
      name: 'ToolTextEncode',
      path: '/text-encode',
      component: () => import('@/views/ToolTextEncode/index.vue')
    },
    {
      name: 'ToolBase64',
      path: '/base64',
      component: () => import('@/views/ToolBase64/index.vue')
    },
    {
      name: 'ToolQrcode',
      path: '/qrcode',
      component: () => import('@/views/ToolQrcode/index.vue')
    },
    {
      name: 'ToolCharmap',
      path: '/charmap',
      component: () => import('@/views/ToolCharMap/index.vue')
    },
    {
      name: 'ToolLoan',
      path: '/loan',
      component: () => import('@/views/ToolLoan/index.vue')
    },
    {
      name: 'ToolBroadlink',
      path: '/broadlink',
      component: () => import('@/views/ToolBroadlink/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Error404/index.vue')
    }
  ]
})
