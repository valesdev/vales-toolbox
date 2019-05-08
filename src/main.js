import Vue from 'vue'

import App from '@/app'

import components from '@/components'

import router from '@/router'

Vue.use(components)

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  router,
  created () {
    this.$mount('#app')
  },
  render (createElement) {
    return createElement(App)
  }
})
