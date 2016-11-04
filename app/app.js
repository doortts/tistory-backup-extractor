import fs from 'fs';
import XmlStream from 'xml-stream';
import toMarkdown from 'to-markdown';
import striptags from 'striptags';

import postParser from './parser/postParser';
import commentParser from './parser/commentParser';

var count = 0;
const readable = fs.createReadStream('./ti.xml');
var xml = new XmlStream(readable);

xml.preserve('content', true);
xml.collect('comment');
xml.on('endElement: post', function (post) {
  count++;
  if (count > 282) {
    console.log(postParser.createHeader(post));
    console.log(post.title);
    console.log("===")
    console.log(striptags(toMarkdown(post.content.$text)));
    console.log("#### comments")
    console.log(commentParser.parseCommentList(post.comment));
    // console.log(striptags(toMarkdown(post.content)));
    process.exit();
  }
});
