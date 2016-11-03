import moment from 'moment';

export const parseContent = (comment) => {
  let content = comment.content[0];
  return content + '\n\n' + commentFooter(comment);
};

export const timestampConverter = (unixtime) => {
  moment.locale('ko');
  let date = moment(new Date(unixtime * 1000));
  return date.format('YYYY년 M월 D일 dddd A h:m');
};

export const commentFooter = (comment) => {
  let author = comment.commenter[0].name;
  let homepage = comment.commenter[0].homepage;

  if (homepage) {
    return `- [${author}](${homepage}) ${timestampConverter(comment.written)}\n`;
  } else {
    return author;
  }
};
