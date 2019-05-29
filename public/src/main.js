import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'


Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Notifications)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'firebaseui/dist/firebaseui.css'

import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
