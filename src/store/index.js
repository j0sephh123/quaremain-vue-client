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
    showForm: false,
    stocks: {},
    search: "",
    alert: {
      a: 5,
      active: false,
    }
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
    },
    updateSearch(state, value) {
      state.search = value;
    },
    setAlert(state, { active }) {
      console.log('set alert');
      state.alert = {
        ...state.alert,
        active,
      }
    }
    // addNewStock(state, stock) {
    //   state.stocks = {
    //     ...state.stocks,
    //     [state.activeTab]: [...state[state.activeTab], stock]
    //   }
    // }
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
    async submit({state, dispatch, commit}, fields) {
      // parse the data for the different types of stocks
      let submitData = InputParser.submitData(fields, state.activeTab);

      let result = await api.create(submitData);

      // for now we get only result.status, so, we fetch the whole
      // dataset again in the future probably just get the newly created
      // stock and add it do the existing stocks
      if(result.status === 200) {
        let exists = result.data.status === 404;
        if (!exists) {
          dispatch('loadStocks', state.activeTab);
          return;
        };

        commit('setAlert', ({ active: true }))
        
        
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
    },
    async updateStock({state, dispatch}, {stock, name}) {
      stock['name'] = name;
      stock['stockCategory'] = state.activeTab;

      let result = await api.update(stock);

      if(result.status === 200) {
        dispatch('loadStocks', state.activeTab)
      } else {
        console.log('error');
      }
    }
  },
  getters: {
    activeTab: ({ activeTab }) => activeTab,
    showForm: ({ showForm }) => showForm,
    stocks: ({ stocks, search, activeTab }) => {

      if(search.length > 0) {
        return stocks[activeTab].filter(item => {
          if(item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            return true;
          }
          return false
        })
      }

      return stocks[activeTab]
    },
    search: ({ search }) => search,
    alert: ({ alert }) => {
      console.log('asd');
      return alert
    },
  }
});