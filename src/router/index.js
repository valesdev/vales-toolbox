import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/Home')
    },
    {
      name: 'ToolTextEncode',
      path: '/text-encode',
      component: () => import('@/views/ToolTextEncode')
    },
    {
      name: 'ToolBase64',
      path: '/base64',
      component: () => import('@/views/ToolBase64')
    },
    {
      name: 'ToolQrcode',
      path: '/qrcode',
      component: () => import('@/views/ToolQrcode')
    },
    {
      name: 'ToolLoan',
      path: '/loan',
      component: () => import('@/views/ToolLoan')
    },
    {
      name: 'ToolBroadlink',
      path: '/broadlink',
      component: () => import('@/views/ToolBroadlink')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Error404')
    }
  ]
})
