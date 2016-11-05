import toMarkdown from 'to-markdown';
import striptags from 'striptags';
import moment from 'moment';
import fse from 'fs-extra';
import path from 'path';
import config from '../config';
import postParser from './parser/postParser';
import commentParser from './parser/commentParser';
import { timestampConverter, lpadZero, attachmentWriter, getTistoryServerFileUrl } from './parser/utils';

class Post {
  constructor(postJson) {
    this.post = postJson;
    this.baseDir = './blog';
    this.attchmentDir = path.join(this.baseDir, './attachments');
    this.attachmentList = [];
    this.collectAttachmentList();
  }

  collectAttachmentList() {
    if (this.post.attachment) {
      this.post.attachment.forEach(item => {
        this.attachmentList.push({
          name: item.label,
          url: getTistoryServerFileUrl(item.name)
        });
      });
    }
  }

  getTitleLine() {
    return this.post.title + "\n===\n";
  }

  getSuggestedFilename() {
    moment.locale('ko-KR');
    let date = moment(new Date((this.post.published || this.post.created) * 1000));
    return `${lpadZero(this.post.id, 5)}-${date.format('YYYYMMDD')}-${this.post.$.slogan}.md`;
  }

  getBody() {
    return postParser.replaceTistoryCustomImageTag(striptags(toMarkdown(this.post.content.$text)));
  }

  getPostDetail() {
    let detail = `> ${config.name} | ${timestampConverter(this.post.created)}`;
    if (this.post.category) {
      detail += ' | ' + this.post.category;
    }
    detail += ' | ' + this.getOriginalPageUrl();
    return detail + '\n\n';
  }

  getOriginalPageUrl(){
    return `[원본](${config.tistoryUrl}/${this.post.id})`;
  }

  writeToFile() {
    fse.outputFile(path.join(this.baseDir, this.getSuggestedFilename()), this.doc(), (err) => {
      if (err) console.error(err);
      this.writeAttachments();
    });
  }

  writeAttachments() {
    if (this.post.attachment) {
      this.post.attachment.forEach(item => {
        attachmentWriter(path.join(this.attchmentDir, item.label), item.content.$text);
      });
    }
  }

  getAttachmentsList() {
    let listString = `\n##### Attachments(${this.attachmentList.length})\n`;
    this.attachmentList.forEach(attachment => {
      listString += `- [${attachment.name}](${attachment.url})\n`
    });
    return listString;
  }

  doc() {
    let body = this.getTitleLine() + this.getPostDetail() + this.getBody();
    if (this.attachmentList.length > 0) {
      body += this.getAttachmentsList();
    }
    if (this.post.comment && this.post.comment.length > 0) {
      body += `\n\n#### Comments\n` + commentParser.parseCommentList(this.post.comment)
    }
    return body;
  }
}

export default Post;
