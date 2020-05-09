/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '../classes/Api';
import { InputParser } from '../classes/InputParser';

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTab: "food",
    showForm: true,
    stocks: {},
  },
  mutations: {
    changeCategory(state, payload) {
      state.activeTab = payload;
    },
    toggleShowForm(state) {
      state.showForm = !state.showForm;
    },
    loadStocks(state, stocks) {
      state.stocks = {...state.stocks, [state.activeTab]: stocks}
    }
  },
  // state, rootState, commit, dispatch, getters, rootGetters
  actions: {
    async loadStocks({commit}, category) {
      commit('loadStocks', (await api.get(category)).data.stocks);
    },
    async changeCategory({dispatch, commit}, category) {
      // dispatch to fetch the new stocks
      dispatch('loadStocks', category);

      // update our stuff..
      commit('changeCategory', category);

      // I know that this needs refactoring, since it fires twice
      // but it finally works
    },
    async submit({state, dispatch}, fields) {
      // parse the data for the different types of stocks
      let submitData = InputParser.submitData(fields, state.activeTab);

      let result = await api.create(submitData);

      // for now we get only result.status, so, we fetch the whole
      // dataset again in the future probably just get the newly created
      // stock and add it do the existing stocks
      if(result.status === 200) {
        dispatch('loadStocks', state.activeTab)
      } else {
        console.log('error');
      }
    },
    async removeStock({state, dispatch}, id) {
      let result = await api.remove(id, state.activeTab);

      // same as submit
      if(result.status === 200) {
        dispatch('loadStocks', state.activeTab)
      } else {
        console.log('error');
      }
    }
  },
  getters: {
    activeTab: state => state.activeTab,
    showForm: state => state.showForm,
    stocks: state => {
      console.log('getters');
      return state.stocks[state.activeTab]
    },
  }
});