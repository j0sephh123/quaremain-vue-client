import Vue from 'vue'
import Index from './Index.vue'

Vue.config.productionTip = false
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './assets/bootstrap.css';
import './assets/style.css';

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

import store from './store'
import router from './router'

new Vue({
  router,
  store,
  render: h => h(Index),
}).$mount('#app')
