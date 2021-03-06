import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'App',
      component: () => import('./App.vue'),
    },
    {
      path: '/survival',
      name: 'Survival days',
      component: () => import('./views/Survival.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('./views/Settings.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/stocks/:stock/:id',
      name: 'Stock',
      component: () => import('./views/Stock.vue'),
    },

  ],
});
