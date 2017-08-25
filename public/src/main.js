// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import Router from 'vue-router'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	store,
	Router,
	render: h => h(App)
})
