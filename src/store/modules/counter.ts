import { RootState } from '@/store/store';
import { Action, ActionTree, GetterTree, Module, Mutation, MutationTree } from 'vuex';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface CounterState {
  main: number;
  data: Post[] | null;
}

export interface CounterGetters extends GetterTree<CounterState, RootState> {
  double: (state: CounterState) => number;
}

export interface CounterMutations extends MutationTree<CounterState> {
  DECREMENT_MAIN_COUNTER: Mutation<CounterState>;
  INCREMENT_MAIN_COUNTER: Mutation<CounterState>;
  ADD_DATA: Mutation<CounterState>;
}

export interface CounterActions extends ActionTree<CounterState, RootState> {
  getData: Action<CounterState, RootState>;
}

const state: CounterState = {
  main: 0,
  data: null
};

const getters: CounterGetters = {
  double: (state) => state.main * 2
};

const mutations: CounterMutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.main--;
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.main++;
  },
  ADD_DATA(state, data) {
    state.data = data;
  }
};

const actions: CounterActions = {
  async getData({ commit }) {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts');
    commit('ADD_DATA', await data.json());
  }
};

export const counter: Module<CounterState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
