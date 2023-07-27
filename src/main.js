import Vue from 'vue'

import App from './components/App.vue'

import router from './plugins/router'
import axios from './plugins/axios'

import store from './store/main'

Vue.config.productionTip = false
Vue.use(store);
new Vue({
  router,  
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
