import { timestampConverter } from './utils';

const COMMENT_SEPARATOR = "--";
export const parseComment = (comment) => {
  let content = comment.content.$text;
  content = content.replace(/^ /gm,'');
  return '\n' + content + '\n\n' + commentFooter(comment);
};

export const parseCommentList = (comments) => {
  let commentList = "";
  comments.forEach(comment => {
    commentList += parseComment(comment);
    commentList += "\n" + COMMENT_SEPARATOR + "\n";
    if(comment.comment) {
      commentList += parseCommentList(comment.comment);
    }
  });
  return commentList;
};

export const commentFooter = (comment) => {
  let author = comment.commenter.name;
  let homepage = comment.commenter.homepage;

  if (homepage) {
    return ` [${author}](${homepage}) | ${timestampConverter(comment.written)}\n`;
  } else {
    return ` ${author} | ${timestampConverter(comment.written)}\n`;
  }
};

export default {
  parseCommentList
}
