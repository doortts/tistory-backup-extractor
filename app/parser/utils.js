import moment from 'moment';
import fs from 'fs-extra';

export const timestampConverter = unixtime => {
  moment.locale('ko-KR');
  let date = moment(new Date(unixtime * 1000));
  return date.format('YYYY-MM-DD dddd A h:m');
};

export const tistoryImageTagConverter = tistoryTag => {
  const attachmentDir = './attachments/';
  let splited = tistoryTag.split(" ");
  let filename;
  splited.forEach(str => {
    if (str.indexOf("filename=") !== -1) {
      filename = str.split("\"")[1];
    }
  });

  return `![${filename}](${attachmentDir}${filename})`;
};

export const attachmentWriter = (filename, base64Content) => {
  fs.outputFileSync(filename, new Buffer(base64Content, 'base64'));
};

export const lpadZero = (str, n) => (
    str.length < n ? lpadZero("0" + str, n) : str
);

export const getTistoryServerFileUrl = remoteFileName => {
  let splited = remoteFileName.split('.');
  return `http://${splited[0]}.${splited[1]}.tistory.com/attach/${splited[2]}`;
};
