import { createApp } from 'vue'

import App from '@/App.vue'

import router from '@/router'
import components from '@/components'

const app = createApp(App)

app
  .use(router)
  .use(components)
  .mount('#app')
