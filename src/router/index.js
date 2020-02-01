import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "view" */ '@/views/home')
    },
    {
      path: '/text-encoding',
      component: () => import(/* webpackChunkName: "view" */ '@/views/tool-text-encoding')
    },
    {
      path: '/base64',
      component: () => import(/* webpackChunkName: "view" */ '@/views/tool-base64')
    },
    {
      path: '/qrcode',
      component: () => import(/* webpackChunkName: "view" */ '@/views/tool-qrcode')
    },
    {
      path: '/loan',
      component: () => import(/* webpackChunkName: "view" */ '@/views/tool-loan')
    },
    {
      path: '/broadlink',
      component: () => import(/* webpackChunkName: "view" */ '@/views/tool-broadlink')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "view" */ '@/views/404')
    }
  ]
})
