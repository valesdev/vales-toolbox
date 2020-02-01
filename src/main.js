import Vue from 'vue'
import App from '@/app'

import components from '@/components'

import router from '@/router'

import fileService from '@/services/file'

Vue.use(components)

Vue.use(fileService)

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
