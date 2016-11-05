import moment from 'moment';
import fs from 'fs-extra';

export const timestampConverter = unixtime => {
  moment.locale('ko-KR');
  let date = moment(new Date(unixtime * 1000));
  return date.format('YYYY-MM-DD dddd A h:m');
};

export const tistoryImageTagConverter = tistoryTag => {
  const attachmentDir = './attachments/';
  let treatAsImage = "";
  let filename;

  tistoryTag.split(" ").forEach(str => {
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
