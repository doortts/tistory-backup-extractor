import fs from 'fs';
import XmlStream from 'xml-stream';
import Post from './Post';
import Indexer from './Indexer';

var count = 0;
const readable = fs.createReadStream('./ti.xml');
var xml = new XmlStream(readable);

xml.preserve('content', true);
xml.collect('comment');
xml.collect('attachment');

console.time('time');
var indexer = new Indexer();

xml.on('endElement: post', function (post) {
  try {
    let out = new Post(post);
    out.writeToFile();
    indexer.addPost(out);

    process.stdout.write(".");
    count++;
  } catch (e) {
    console.log(e);
  }
});

xml.on('error', function (message) {
  console.log('Parsing as ' + (encoding || 'auto') + ' failed: ' + message);
});

xml.on('end', (arg) => {
  indexer.out();
  console.log('\nTotal: ', count);
  console.timeEnd('time');
});
