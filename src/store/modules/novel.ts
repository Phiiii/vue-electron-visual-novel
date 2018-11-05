import { ClickAction, ScriptOption, Script } from '@/scripts/interfaces/script';
import { RootState } from '@/store/store';
import { ActionTree, Module, Mutation, MutationTree, Action } from 'vuex';
import { waitFor } from '@/scripts/tools/timeTools';
import { LineSpeed, Speed } from '@/scripts/interfaces/speeds';
import { filterSpecialCharacters } from '@/scripts/interfaces/specialCharacters';

const { Slow, Medium, Fast } = Speed;

export interface NovelState {
  actionRemaining: ClickAction[];
  actionPlayed: ClickAction[];
  options: ScriptOption | {};
  line: string;
  lineRunning: boolean;
  lineSpeed: number;
  counter: number;
  speaker: string;
}

export interface NovelMutations extends MutationTree<NovelState> {
  PASS_ACTION: (state: NovelState) => void;
  SET_SCRIPT: (state: NovelState, script: Script) => void;
  APPEND_LINE: (state: NovelState, val: string) => void;
  FINISH_LINE: (state: NovelState) => void;
  CLEAR_LINE: (state: NovelState) => void;
  SET_LINE_SPEED: (state: NovelState, val: Speed) => void;
  SET_SPEAKER: (state: NovelState, val: string) => void;
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
  counter: 0,
  lineSpeed: LineSpeed[Medium],
  speaker: ''
};

const mutations: NovelMutations = {
  SET_SCRIPT: (state, script) => {
    const { actionRemaining, options } = state;
    actionRemaining.push(...script.actions);
    Object.assign(options, script.options);
  },
  INCREMENT: (state, val) => {
    state.counter += val || 1;
  },
  PASS_ACTION: (state) => {
    const { actionPlayed, actionRemaining } = state;
    if (!actionRemaining.length) { return; }
    const action = actionRemaining.shift();
    if (action) {
      actionPlayed.push(action);
    }
  },
  TOGGLE_LINE_RUNNING: (state) => {
    state.lineRunning = !state.lineRunning;
  },
  APPEND_LINE: (state, val: string) => {
    state.line += val;
  },
  FINISH_LINE: (state) => {
    if (!state.actionRemaining[0].runText) { return; }
    state.line = filterSpecialCharacters(state.actionRemaining[0].runText.text);
    state.lineRunning = false;
    state.lineSpeed = LineSpeed[Medium];
  },
  CLEAR_LINE: (state) => {
    state.line = '';
  },
  SET_LINE_SPEED: (state, val: Speed) => {
    state.lineSpeed = LineSpeed[val];
  },
  SET_SPEAKER: (state, val: string) => {
    state.speaker = val;
  }
};

const actions: NovelActions = {
  handleClick: async ({ dispatch, state, commit }) => {
    if (!state.lineRunning) {
      dispatch('runText');
      return;
    }
    commit('FINISH_LINE');
    commit('SET_LINE_SPEED', Medium);
    commit('PASS_ACTION');
  },
  runText: async ({ state, commit }) => {
    const {actionRemaining} = state;
    const textOption = actionRemaining[0].runText;
    if (!textOption) { return; }
    commit('CLEAR_LINE');
    commit('TOGGLE_LINE_RUNNING');
    let speaker;
    if (textOption.speaker) {
      speaker = typeof textOption.speaker === 'string' ? textOption.speaker : textOption.speaker.name;
    } else {
      speaker = '';
    }
    commit('SET_SPEAKER', speaker);
    for (const char of textOption.text.split('')) {
      if (!state.lineRunning) { return; }
      if (Object.values(Speed).includes(char)) {
        commit('SET_LINE_SPEED', char);
        continue;
      }
      if (char === '_') {
        await waitFor(500);
        continue;
      }
      const voice = actionRemaining[0].runVoice;
      if (voice) {
        new Audio(voice).play();
      }
      commit('APPEND_LINE', char);
      await waitFor(state.lineSpeed);
    }
    if (state.lineRunning) {
      commit('TOGGLE_LINE_RUNNING');
      commit('SET_LINE_SPEED', Medium);
      commit('PASS_ACTION');
    }
  }
};

export const novel: Module<NovelState, RootState> = {
  state,
  mutations,
  actions,
  namespaced: true
};
