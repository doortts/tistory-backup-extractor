import moment from 'moment';
import fs from 'fs-extra';

export const timestampConverter = (unixtime) => {
  moment.locale('ko-KR');
  let date = moment(new Date(unixtime * 1000));
  return date.format('YYYY-MM-DD dddd A h:m');
};

export const tistoryImageTagConverter = (tistoryTag) => {
  let splited = tistoryTag.split(" ");
  let filename;
  splited.forEach(str => {
    if (str.indexOf("filename=") !== -1) {
      filename = str.split("\"")[1];
    }
  });

  return `![${filename}](./attachments/${filename})`;
};

export const attachmentWriter = (filename, base64Content) => {
  fs.outputFileSync(filename, new Buffer(base64Content, 'base64'));
};
