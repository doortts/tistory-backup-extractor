import fs from 'fs';
import path from 'path';
import unirest from 'unirest';
import XmlStream from 'xml-stream';
import Post from './Post';
import Indexer from './Indexer';
import config from '../config';

var totalCount = 0;
var skipCount = 0;
const readable = fs.createReadStream('./ti.xml');
var xml = createXmlStream();

console.time('time');
var indexer = new Indexer();

xml.on('endElement: post', function (postJson) {
  try {
    let post = new Post(postJson);
    if (config.HIDE_PRIVATE_POST && post.post.visibility === 'private') {
      // ToDo: 격리해서 저장하거나 스킵하거나..
      skipCount++;
    } else {
      post.writeToFile();
      indexer.addPost(post);
      process.stdout.write('.');
      setTimeout(() => pushFiles(post), totalCount * 100 + 3000);
      totalCount++;
    }
  } catch (e) {
    console.log(e);
  }
});

xml.on('error', function (message) {
  console.log('Parsing as auto failed: ' + message);
});

xml.on('end', () => {
  indexer.out();
  console.log('\nTotal: ', totalCount);
  console.log('Skip : ', skipCount);
  console.timeEnd('time');
});

///////////////////////

function createXmlStream() {
  let xml = new XmlStream(readable);

  xml.preserve('content', true);
  xml.collect('comment');
  xml.collect('attachment');
  return xml;
}

function pushFiles(post) {
  var uploadCount = 0;
  if (post.attachmentList.length === 0) {
    pushPost(post);
  }

  post.attachmentList.forEach(attachment => {
    unirest.post(config.YONA_SERVER + '/files')
        .headers({
          'Content-Type': 'multipart/form-data',
          'Yona-Token': 'FUMwruLNFz0EAldNbXuMawqDl01gLp1XI0M7qPu1pX0='
        })
        .attach('filePath', path.join(config.EXPORT_BASE_DIR, config.ATTACHMENTS_DIR, attachment.label)) // Attachment
        .end(function (response) {
          let file = { postId: post.post.id, filename: attachment.label, url: response.headers.location };
          attachment.yonaFile = file.url.split('/')[2];
          uploadCount++;
          if (uploadCount === post.attachmentList.length) {
            pushPost(post);
          }
        });
  });
}

var okCount = 0;
function pushPost(post) {
  let files = [];
  post.attachmentList.forEach(item => {
    files.push(item.yonaFile);
  });
  let data = {
    'id': post.post.id,
    'title': post.post.title,
    'body': post.getPostDetail() + post.getBody() + post.getCommentList(),
    'temporaryUploadFiles': files,
    'created': post.getDefaultPostTimestamp()
  };

  unirest.post(config.YONA_SERVER + '/-_-api/v1/owners/doortts/projects/Test/posts')
      .headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Yona-Token': 'FUMwruLNFz0EAldNbXuMawqDl01gLp1XI0M7qPu1pX0='
      })
      .send(data)
      .end(function (response) {
        if (response.status == '200') {
          okCount++;
        }
        console.log(response.status === '200' ? 'OK: ' + okCount : response.status, data.id + '-', data.title);
      });
}
