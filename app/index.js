import Vue from 'vue'
import App from './app.vue'
import '@s/css/common.css'

const root = document.createElement("div")
document.body.appendChild(root)

new Vue({
	render:(h) => h(App)
}).$mount(root)