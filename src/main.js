import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './assets/bootstrap.css';
import './assets/style.css';

import store from './store'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
