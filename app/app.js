import fs from 'fs';
import XmlStream from 'xml-stream';
import Post from './Post';

var count = 0;
const readable = fs.createReadStream('./ti.xml');
var xml = new XmlStream(readable);

xml.preserve('content', true);
xml.collect('comment');
xml.collect('attachment');

console.time('time');

xml.on('endElement: post', function (post) {
  if(count === 16) {
    let out = new Post(post);
    out.writeToFile();
  }
  process.stdout.write(".");
  count++;
});

xml.on('error', function(message) {
  console.log('Parsing as ' + (encoding || 'auto') + ' failed: ' + message);
});

xml.on('end', (arg) => {
  console.log('\nTotal: ', count);
  console.timeEnd('time');
});
