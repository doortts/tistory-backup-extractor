import toMarkdown from 'to-markdown';
import striptags from 'striptags';
import moment from 'moment';
import fse from 'fs-extra';
import path from 'path';
import config from '../config';
import commentParser from './parser/commentParser';
import { timestampConverter, lpadZero, attachmentWriter, getTistoryServerFileUrl, tistoryTagConverter } from './parser/utils';

class Post {
  constructor(postJson) {
    this.post = postJson;
    this.attchmentPath = path.join(config.baseDir, config.attchmentDir);
    this.attachmentList = [];
    this.collectAttachmentList();
  }

  collectAttachmentList() {
    if (this.post.attachment) {
      this.post.attachment.forEach(item => {
        this.attachmentList.push({
          name: item.name,
          label: item.label,
          url: getTistoryServerFileUrl(item)
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
    return this.replaceTistoryCustomTagFromBody();
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
    fse.outputFile(path.join(config.baseDir, this.getSuggestedFilename()), this.doc(), (err) => {
      if (err) console.error(err);
      this.writeAttachments();
    });
  }

  writeAttachments() {
    if (this.post.attachment) {
      this.post.attachment.forEach(item => {
        attachmentWriter(path.join(this.attchmentPath, item.label), item.content.$text);
      });
    }
  }

  getAttachmentsList() {
    let listString = `\n##### Attachments(${this.attachmentList.length})\n`;  // headline
    this.attachmentList.forEach(attachment => {
      listString += `- [${attachment.label}](${attachment.url})\n`
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

  replaceTistoryCustomTagFromBody(forcedText){
    let content = forcedText || striptags(toMarkdown(this.post.content.$text, { gfm: true }));
    let attachmentList = this.attachmentList;
    if(hasOldCustomTag(content)){
      return content.replace(/\[]\(\[##_ATTACH_PATH_##]\/(.*?)\)/g, parseOldLink);
    }
    return content.replace(/\[##(.*?)##]/g, a => {
      return tistoryTagConverter(a);
    });

    /////////////////////
    function parseOldLink(all, filename){
      let attachment;
      attachmentList.some(item => {
        if (item.name === filename) {
          attachment = item;
          item.url = config.attchmentDir + '/' + item.label;  // force Update url to local file
          return true;
        }
      });
      return `[${attachment.label}](./${path.join(config.attchmentDir, attachment.label)})`;
    }

    function hasOldCustomTag(text) {
      return text.indexOf('![]([##_ATTACH_PATH_##]') !== -1
    }
  };
}

export default Post;
