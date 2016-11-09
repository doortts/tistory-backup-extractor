import fs from 'fs';
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
    if (config.hidePrivatePost && post.post.visibility === 'private') {
      // ToDo: 격리해서 저장하거나 스킵하거나..
      skipCount++;
    } else {
      post.writeToFile();
      indexer.addPost(post);
      process.stdout.write('.');
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
