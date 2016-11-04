import { timestampConverter } from './utils';

const COMMENT_SEPARATOR = "---";
export const parseComment = (comment) => {
  let content = comment.content[0];
  content = content.replace(/\r/g, '');
  return content + '\n\n' + commentFooter(comment);
};

export const parseCommentList = (comments) => {
  let commentList = "";
  comments.forEach(comment => {
    commentList += "\n" + COMMENT_SEPARATOR + "\n\n";
    commentList += parseComment(comment);
    if(comment.comment) {
      commentList += parseCommentList(comment.comment);
    }
  });
  return commentList;
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
