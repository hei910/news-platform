import axios from 'axios';
import { dictionary } from './dummyData';

export const fetchDictionary = async (): Promise<any> => {
  // return axios.get('')
  try {
    const test = await axios.get('http://172.16.50.230:8081/news-and-research/classifications?language_code=zh_CN', {
      timeout: 1000,
    })
    return test;
  } catch(e) {
    console.log(e)
  }
  return new Promise(resolve => resolve(dictionary))
}
