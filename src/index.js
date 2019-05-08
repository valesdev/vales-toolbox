
import Vue       from 'vue'
import VueRouter from 'vue-router'

import appMain   from './app.vue'
import appRoutes from './routes'

import 'bootstrap'
import 'bootstrap/less/bootstrap.less'
import './assets/sass/app.scss'

Vue.use(VueRouter)

if (document.getElementById('app')) {

	const router = new VueRouter({
		'mode': 'history',
		'base': '/',
		'routes': appRoutes,
	})

	const app = new Vue({
		router,
		'render': function (createElement) {
			return createElement(appMain)
		},
	})

	RegExp.escape = function (str) {
		return str.replace(/[.*+?^${}()|\[\]\\]/g, "\\$&"); // $& means the whole matched string
	}

	app.$mount('#app')

}

