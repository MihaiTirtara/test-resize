import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { board } from './board';
import { sidebar } from './sidebar';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store: StoreOptions<any> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    board,
    sidebar
  },
  plugins: [createPersistedState()]
};

export default new Vuex.Store<any>(store);
