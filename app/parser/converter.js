import moment from 'moment';

export const timestampConverter = (unixtime) => {
  moment.locale('ko');
  let date = moment(new Date(unixtime * 1000));
  return date.format('YYYY년 M월 D일 dddd A h:m');
};
