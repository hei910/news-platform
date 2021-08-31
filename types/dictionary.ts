/* eslint-disable camelcase */
export enum Language {
  en = 'en',
  zh_CN = 'zh_CN',
}

export interface Tag {
  id: number,
  description: string,
}

export interface DictionaryItem {
  description: string,
  tags: Tag[],
}

export interface Dictionary {
  // language_code: Language,
  [propName: string]: DictionaryItem,
}