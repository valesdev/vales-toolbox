import { type App } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import FormFile from './FormFile/index.vue'

export default class {
  static install (app: App) {
    app.component('FormFile', FormFile)
  }
}
