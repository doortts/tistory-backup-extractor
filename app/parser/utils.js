import moment from 'moment';
import fs from 'fs-extra';
import path from 'path';
import config from '../../config';

export const timestampConverter = unixtime => {
  moment.locale('ko-KR');
  let date = moment(new Date(unixtime * 1000));
  return date.format('YYYY-MM-DD dddd A h:m');
};

export const tistoryImageTagConverter = tistoryTag => {
  const attachmentDir = './attachments/';
  let treatAsImage = "";
  let filename;

  tistoryTag.split("\" ").forEach(str => {
    if (str.indexOf("filename=") !== -1) {
      filename = str.split("\"")[1];
    }
    if (isImage(str)) {
      treatAsImage = "!";
    }
  });
  return `${treatAsImage}[${filename}](${attachmentDir}${filename})`;

  /// private function
  function isImage(str) {
    return str.indexOf("filemime=") !== -1 && str.indexOf("image") !== -1;
  }
};

export const attachmentWriter = (filename, base64Content, cb) => {
  fs.outputFile(filename, new Buffer(base64Content, 'base64'), err => {
    if (err) console.error(err);
    if (typeof cb === 'function') return cb();
  });
};

export const lpadZero = (str, n) => (
    str.length < n ? lpadZero("0" + str, n) : str
);

export const getTistoryServerFileUrl = (item) => {
  let splited = item.name.split('.');
  if (item.$.mime.indexOf('image') !== -1) {
    return `http://${splited[0]}.${splited[1]}.tistory.com/attach/${splited[2]}`;
  } else {
    return `${config.tistoryUrl}/attachment/${item.name}`;
  }
};
