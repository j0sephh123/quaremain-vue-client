/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";




import { state, initialUpdateObject } from "./state";
import { getters } from "./getters";
import { mutations } from './mutations';
import { actions } from './actions';

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
