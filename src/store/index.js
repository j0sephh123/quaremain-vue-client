import Vue from 'vue'
import Vuex from 'vuex'


// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTab: "food",
  },
  mutations: {
    changeCategory(state, payload) {
      state.activeTab = payload;
    }
  },
  actions: {

  },
  getters: {
    activeTab: state => state.activeTab,
  }
})