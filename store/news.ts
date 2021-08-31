import { ActionTree, MutationTree, GetterTree } from 'vuex/types';
import { cloneDeep } from 'lodash';
import { RootState } from '.';
import { fetchNewsList, FetchNewsListParams } from '~/api/news';

enum MutationTypes {
  SET_NEWSLIST = 'SET_NEWSLIST',
  RESET_NEWSLIST = 'RESET_NEWSLIST',
}

const initState = {
  list: {
    page: null,
    pageIndex: 1,
    pageSize: 0,
    totalPage: 0,
    totalCount: 0,
    pageDatas: [],
  }
}

export const state = cloneDeep(initState);

export type State = typeof state;

export const actions: ActionTree<State, RootState> = {
  getNewsList: async({ commit }, params?: FetchNewsListParams) => {
    const data = await fetchNewsList(params);
    commit(MutationTypes.SET_NEWSLIST, data);
  },
  resetNewsList: ({ commit }) => {
    commit(MutationTypes.RESET_NEWSLIST);
  }
}

export const mutations: MutationTree<State> = {
  [MutationTypes.SET_NEWSLIST]: (state, payload) => {
    state.list = payload
  },
  [MutationTypes.RESET_NEWSLIST]: (state) => {
    state.list = cloneDeep(initState.list);
  }
}