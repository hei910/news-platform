import moment from "moment";

export const DATE_FORMAT_STRING = 'YYYY-MM-DD';

export const toDateString = (date: number | string | Date): string => {
  return moment(date).format(DATE_FORMAT_STRING);
}