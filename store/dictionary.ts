import { ActionTree, MutationTree, GetterTree } from 'vuex/types';
import { RootState } from '.';
import { fetchDictionary } from '~/api/dictionary';
import { DictionaryItem } from '~/types/dictionary';

enum MutationTypes {
  SET_DICTIONARY = 'SET_DICTIONARY',
}

interface LabelMap {
  [propName: string]: Record<(string | number), string>
}

export const state = {
  lang: '',
  list: {} as {[propName: string]: DictionaryItem},
}

export type State = typeof state;

export const actions: ActionTree<State, RootState> = {
  getDictionary: async ({ commit }) => {
    try {
      const payload = await fetchDictionary();
      commit(MutationTypes.SET_DICTIONARY, payload);
    } catch(e) {
      console.warn('API error:', e);
    }
  },
}

export const mutations: MutationTree<State> = {
  [MutationTypes.SET_DICTIONARY](state, {language_code, ...list}) {
    state.lang = language_code;
    state.list = {...state.list, ...list}
  },
}

export const getters: GetterTree<State, RootState> = {
  getDictLabelMap: (state): LabelMap => {
    const map = {} as LabelMap;
    Object.keys(state.list).forEach(type => {
      map[type] = {};
      state.list[type].tags.forEach(tag => {
        map[type][tag.id] = tag.description;
      })
    })
    return map;
  },
  getDictLabelById: (_, getter) => (type: string, id: (number | string)): string => {
    const map = getter.getDictLabelMap;
    return map?.[type]?.[id] || '';
  }
}