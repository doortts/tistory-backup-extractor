import toMarkdown from 'to-markdown';
import striptags from 'striptags';
import postParser from './parser/postParser';
import commentParser from './parser/commentParser';
import { timestampConverter } from './parser/utils';

class Post {
  constructor(postJson) {
    this.post = postJson;
  }

  getTitle() {
    return this.post.title;
  }

  getTitleLine() {
    return this.getTitle() + "\n===\n";
  }

  getBody() {
    return postParser.replaceTistoryCustomImageTag(striptags(toMarkdown(this.post.content.$text)));
  }

  getPostDetail() {
    return `| ${timestampConverter(this.post.created)}} | ${this.post.category}\n\n`;
  }

  doc() {
    let body = this.getTitleLine() + this.getPostDetail() + this.getBody();
    if (this.post.comment && this.post.comment.length > 0) {
      body += "\n\n#### comments " + commentParser.parseCommentList(this.post.comment)
    }
    return body;
  }
}

export default Post;
