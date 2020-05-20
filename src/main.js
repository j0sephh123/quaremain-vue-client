import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";

// css
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/bootstrap.css";
import "sweetalert2/dist/sweetalert2.min.css";

// tools
Vue.use(VueSweetalert2);

// main stuff
import router from "./router";
import store from "./store";
import Index from "./Index.vue";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(Index),
}).$mount("#app");
