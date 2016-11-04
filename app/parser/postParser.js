import { timestampConverter } from './converter';

export const parseContent = (comment) => {
  let content = comment.content[0];
  return content + '\n\n' + commentFooter(comment);
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
