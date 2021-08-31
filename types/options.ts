export interface Options<T = number> {
  text: string,
  value: T,
  [propName: string]: any,
}