import { ClickAction, ScriptOption, Script } from '@/scripts/interfaces/script';
import { RootState } from '@/store/store';
import { ActionTree, Module, Mutation, MutationTree, Action } from 'vuex';
import { waitFor } from '@/scripts/tools/timeTools';
import Vue from 'vue';

export interface NovelState {
  actionRemaining: ClickAction[];
  actionPlayed: ClickAction[];
  options: ScriptOption | {};
  line: string;
  lineRunning: boolean;
  counter: number;
}

export interface NovelMutations extends MutationTree<NovelState> {
  PASS_ACTION: Mutation<NovelState>;
  SET_SCRIPT: Mutation<NovelState>;
}

export interface NovelActions extends ActionTree<NovelState, RootState> {
  runText: Action<NovelState, RootState>;
}

const state: NovelState = {
  actionRemaining: [],
  actionPlayed: [],
  options: {},
  line: '',
  lineRunning: false,
  counter: 0
};

const mutations: NovelMutations = {
  SET_SCRIPT(state, script: Script) {
    const { actionRemaining, options } = state;
    actionRemaining.push(...script.actions);
    Object.assign(options, script.options);
  },
  INCREMENT(state, val) {
    state.counter += val || 1;
  },
  PASS_ACTION(state) {
    const { actionPlayed, actionRemaining } = state;
    if (!actionRemaining.length) { return; }
    const action = actionRemaining.shift();
    if (action) {
      actionPlayed.push(action);
    }
  },
  TOGGLE_LINE_RUNNING(state) {
    state.lineRunning = !state.lineRunning;
  },
  APPEND_LINE(state, val: string) {
    state.line += val;
  }
};

const actions: NovelActions = {
  async runText({ state, commit }) {
    const { actionRemaining } = state;
    const textOption = actionRemaining[0].runText;
    if (!textOption) { return; }
    commit('TOGGLE_LINE_RUNNING');
    for (const char of textOption.text.split('')) {
      commit('APPEND_LINE', char);
      await waitFor(100);
    }
    commit('TOGGLE_LINE_RUNNING');
  }
};

export const novel: Module<NovelState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true
};
