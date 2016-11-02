import fs from 'fs';
import xml2js from 'xml2js';
import toMarkdown from 'to-markdown';
import striptags from 'striptags';

var parser = new xml2js.Parser();
fs.readFile('./ti.xml', function (err, data) {
  if (err) {
    console.log(err);
  }
  var now = Date.now();
  parser.parseString(data, function (err, result) {
    let post = result.blog.post;
    let n = 282;
    console.log(Object.keys(post[n]));
    // console.log(post[n].attachment[0]);
    console.log((post[n]));
    console.log(JSON.stringify(post[n]));
    // console.log(striptags(toMarkdown(post[n].content[0])));
    console.log(result.blog.post.length, ' Done');
    console.log((Date.now() - now) / 1000);
  });
});
