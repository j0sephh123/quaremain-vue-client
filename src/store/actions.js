import { api } from "../classes/Api";
import { InputParser } from "../classes/InputParser";
import router from "../router";

export const actions = {
  async loadStocks({ commit }, category) {
    commit("loadStocks", (await api.get(category)).data.stocks);
  },
  async changeCategory({ dispatch, commit }, category) {
    // dispatch to fetch the new stocks
    dispatch("loadStocks", category);

    // update our stuff..
    commit("changeCategory", category);

    // I know that this needs refactoring, since it fires twice
    // but it finally works
  },
  async submit({ state, dispatch, commit }, fields) {
    // parse the data for the different types of stocks
    let submitData = InputParser.submitData(fields, state.activeTab);

    let result = await api.create(submitData);

    // for now we get only result.status, so, we fetch the whole
    // dataset again in the future probably just get the newly created
    // stock and add it do the existing stocks
    if (result.status === 200) {
      let exists = result.data.status === 404;
      if (!exists) {
        dispatch("loadStocks", state.activeTab);
      } else {
        commit("setError", result.data.error);
      }
    } else {
      console.log("Error with creating a stock.");
    }
  },
  async removeStock({ state, dispatch }, id) {
    let result = await api.remove(id, state.activeTab);

    // same as submit
    if (result.status === 200) {
      dispatch("loadStocks", state.activeTab);
    } else {
      console.log("error loading stocks");
    }
  },
  async updateStock({ state, dispatch }, { stock, field, value }) {
    stock[field] = value;
    stock["stockCategory"] = state.activeTab;

    let result = await api.update(stock);

    if (result.status === 200) {
      dispatch("loadStocks", state.activeTab);
    } else {
      console.log("error");
    }
  },
  async update({ dispatch, state, commit }, value) {
    let obj = {
      stock: state.updateObject.stock,
      field: state.updateObject.field,
      value,
    };
    commit("setUpdateObject", null);
    dispatch("updateStock", obj);
  },
  async getOneStock({ commit }, { stock, id }) {
    let item = await api.getOne(stock, id);
    console.log(item);
    if (!item) {
      router.push({
        name: "App",
      });
    } else {
      commit("setOneStock", item);
    }
  },
  async resetDatabase() {
    await api.resetDatabase();
  },
};