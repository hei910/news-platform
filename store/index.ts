import { useStore as baseUseStore } from '@nuxtjs/composition-api';
import { ActionTree, MutationTree, GetterTree } from 'vuex/types';
import { State as DictState } from './dictionary';
import { State as NewsState } from './news';

export const state = {
  test: 1,
}

export type RootState = typeof state & {
  dictionary: DictState,
  news: NewsState,
};

export const actions: ActionTree<RootState, RootState>  = {
  test: ({ commit }) => {
    commit('test')
  }
}

export const mutations: MutationTree<RootState> = {
  test(state) {
    state.test = 10
  }
}

export const getters: GetterTree<RootState, RootState> = {
  test2: () => 123,
}

export function useStore () {
  return baseUseStore<RootState>()
}