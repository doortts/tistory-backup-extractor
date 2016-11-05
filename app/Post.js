import toMarkdown from 'to-markdown';
import striptags from 'striptags';
import moment from 'moment';
import postParser from './parser/postParser';
import commentParser from './parser/commentParser';
import { timestampConverter, lpadZero } from './parser/utils';

class Post {
  constructor(postJson) {
    this.post = postJson;
  }

  getTitleLine() {
    return this.post.title + "\n===\n";
  }

  getSuggestedFilename(){
    moment.locale('ko-KR');
    let date = moment(new Date((this.post.published || this.post.created) * 1000));
    return `${lpadZero(this.post.id, 5)}-${date.format('YYYYMMDD')}-${this.post.$.slogan}`;
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
