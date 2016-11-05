import fs from 'fs';
import XmlStream from 'xml-stream';
import Post from './Post';

var count = 0;
const readable = fs.createReadStream('./ti.xml');
var xml = new XmlStream(readable);

xml.preserve('content', true);
xml.collect('comment');
xml.on('endElement: post', function (post) {
  count++;
  if (count > 200) {
    let out = new Post(post);
    fs.writeFileSync('post.md', JSON.stringify(post));
    fs.appendFileSync('out.md', out.doc());
    process.exit();
  }
});

xml.on('error', function(message) {
  console.log('Parsing as ' + (encoding || 'auto') + ' failed: ' + message);
});
