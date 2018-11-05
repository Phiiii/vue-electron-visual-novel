import { counter, CounterState, NovelState, novel } from '@/store/modules';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

export interface RootState {
  counter: CounterState;
  novel: NovelState;
}

const store: StoreOptions<RootState> = {
  modules: {
    counter,
    novel
  }
};

export default new Vuex.Store<RootState>(store);
