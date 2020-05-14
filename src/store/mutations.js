import { initialUpdateObject } from './state';

export const mutations = {
  changeCategory(state, payload) {
    state.activeTab = payload;
  },
  toggleShowForm(state) {
    state.showForm = !state.showForm;
  },
  loadStocks(state, stocks) {
    state.stocks = { ...state.stocks, [state.activeTab]: stocks };
  },
  updateSearch(state, value) {
    state.search = value;
  },
  setUpdateObject(state, updateObject) {
    if (!updateObject) {
      state.updateObject = initialUpdateObject;
    } else {
      state.updateObject = {
        active: true,
        ...updateObject,
      };
    }
  },
  /**
   * 
   * @param {Object} state - vuex state
   * @param {string} error 
   */
  setError(state, error) {
    state.errors = error;
  },
  setOneStock(state, oneStock) {
    state.oneStock = oneStock;
  },
}