import unirest from 'unirest';
import path from 'path';
import config from '../config';

/**
 * config에 지정된 Yona 서버로 글을 보내는 기능을 담당하는 클래스
 *
 * pushFiles 로 먼저 파일들을 업로드 하고
 * pushPost 로 해당 파일을 첨부파일로 지정해서 글을 옮긴다.
 */
export default class YonaExport {
  constructor() {
    this.okCount = 0;
  }

  pushPost(post) {
    let files = collectAttachmentFileIds(post);
    let data = {
      'id': post.post.id,
      'title': post.post.title,
      'body': post.getPostDetail() + post.getBody() + post.getCommentList(),
      'temporaryUploadFiles': files,
      'created': post.getDefaultPostTimestamp()
    };

    const yonApiUrl = config.YONA.SERVER +
        `${config.YONA.ROOT_CONTEXT}/-_-api/v1/owners/${config.YONA.OWNER_NAME}/projects/${config.YONA.PROJECT_NAME}/posts`;

    unirest.post(yonApiUrl)
        .headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Yona-Token': config.YONA.USER_TOKEN
        })
        .send(data)
        .end(response => {
          if (this.isBadResponse(response.status)) {
            console.log('오류 발생!! HTTP 응답코드를 확인하세요! ', response.status, response.statusMessage);
            process.exit(1);
          }
          this.okCount++;
        });

    ////////////////////////////////////////////////
    function collectAttachmentFileIds(targetPost) {
      let files = [];
      targetPost.attachmentList.forEach(item => {
        files.push(item.yonaFile);
      });
      return files;
    }
  }

  getOkCount() {
    return this.okCount;
  }

  pushFiles(post) {
    var uploaded = 0;
    if (post.attachmentList.length === 0) {
      this.pushPost(post);
    }

    post.attachmentList.forEach(attachment => {
      unirest.post(config.YONA.SERVER + '/files')
          .headers({
            'Content-Type': 'multipart/form-data',
            'Yona-Token': config.YONA.USER_TOKEN
          })
          .attach('filePath', path.join(config.EXPORT_BASE_DIR, config.ATTACHMENTS_DIR, attachment.label)) // Attachment
          .end(response => {
            if (this.isBadResponse(response.status)) {
              console.log('오류 발생!! HTTP 응답코드를 확인하세요! ', response.status, response.statusMessage);
              process.exit(1);
            }

            attachment.yonaFile = response.headers.location.split('/')[2];   // eg. location: /files/71
            uploaded++;
            if (uploaded === post.attachmentList.length) {
              this.pushPost(post);
            }
          });
    });
  }

  isBadResponse(statusCode) {
    return [200, 201].indexOf(statusCode) === -1;
  }
}


