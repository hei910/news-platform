import axios from 'axios';
import { newsListData } from './dummyData';

export interface FetchNewsListParams extends Record<string, any> {};

export const fetchNewsList = (params?: FetchNewsListParams): Promise<any> => {
  // return axios.get('')
  return new Promise(resolve => setTimeout(() => {
    resolve(newsListData)
  }, 1000)); 
}
