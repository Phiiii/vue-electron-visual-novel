import { ClickAction, ScriptOption, TextOption } from '@/scripts/interfaces/script';
import { RootState } from '@/store/store';
import { ActionTree, Module, Mutation, MutationTree, Action } from 'vuex';

export interface NovelState {
  actionRemaining: ClickAction[];
  actionPlayed: ClickAction[];
  options: ScriptOption;
  line: string;
}

export interface NovelMutations extends MutationTree<NovelState> {
  PASS_ACTION: Mutation<NovelState>;
}

export interface NovelActions extends ActionTree<NovelState, RootState> {
  runText: Action<NovelState, RootState>;
}

const state: NovelState = {
  actionRemaining: [],
  actionPlayed: [],
  options: {},
  line: ''
};

const mutations: NovelMutations = {
  PASS_ACTION(state) {
    const { actionPlayed, actionRemaining } = state;
    if (!actionRemaining.length) { return; }
    const action = actionRemaining.shift();
    if (action) {
      actionPlayed.push(action);
    }
  }
};

const actions: NovelActions = {
  async runText({ state }) {
    const { line, actionRemaining } = state;
    const textOption = actionRemaining[0].runText;
    if (!textOption) { return; }
    const lineToRun = typeof textOption === 'string' ? textOption : textOption.text;
  }
};

export const novel: Module<NovelState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true
};
