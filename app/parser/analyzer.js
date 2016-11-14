import fs from 'fs';
import XmlStream from 'xml-stream';
import Post from '../Post';
import config from '../../config';

let results = {
  done: 0,
  skip: 0
};

export default class Analyzer {
  constructor() {
    this.xml = createXmlStream(fs.createReadStream(config.EXPORT_FILE_NAME));
  }

  analyze(handlePost, handlePrivate) {
    var that = this;
    return new Promise((resolve, reject) => {
      that.xml.on('endElement: post', function (postJson) {
        try {
          let post = new Post(postJson);
          if (config.HIDE_PRIVATE_POST && post.post.visibility === 'private') {
            if(typeof handlePrivate === 'function') {
              handlePrivate(post);
            }
            results.skip++;
          } else {
            if(typeof handlePost === 'function') {
              handlePost(post);
            }
            results.done++;
          }
        } catch (e) {
          console.log(e);
        }
      });

      that.xml.on('error', function (message) {
        console.log('Parsing as auto failed: ' + message);
        reject(message);
      });

      that.xml.on('end', () => {
        resolve(results);
      });
    });
  }
}

export function createXmlStream(readable) {
  let xml = new XmlStream(readable);

  xml.preserve('content', true);
  xml.collect('comment');
  xml.collect('attachment');
  return xml;
}
