import { type App } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import DataInput from './DataInput/index.vue'
import DataOutput from './DataOutput/index.vue'
import FormFile from './FormFile/index.vue'

export default class {
  static install (app: App) {
    app.component('DataInput', DataInput)
    app.component('DataOutput', DataOutput)
    app.component('FormFile', FormFile)
  }
}
