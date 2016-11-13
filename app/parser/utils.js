import moment from 'moment';
import fs from 'fs-extra';
import config from '../../config';

export const timestampConverter = (unixtime, format) => {
  moment.locale('ko-KR');
  let date = moment(new Date(unixtime * 1000));
  if(format) {
    return date.format(format);
  }
  return date.format('YYYY-MM-DD dddd A h:m');
};

export const tistoryTagConverter = (tistoryTag, attachmentList) => {
  const attachmentDir = './attachments/';
  let treatAsImage = '';
  let filename = '';

  tistoryTag.split('\" ').forEach(str => {
    if (str.indexOf('filename=') !== -1) {
      filename = str.split('\"')[1];
    }
    if (isImage(str)) {
      treatAsImage = '!';
    }
  });

  let attachment = findAttachmentByLabelName(filename, attachmentList);
  if(attachment.yonaFile){
    return `${treatAsImage}[${attachment.YOUR_NAME}](/files/${attachment.yonaFile})})`;
  }

  return `${treatAsImage}[${filename}](${attachmentDir}${filename})`;

  //////////////////////////////////////////
  function isImage(str) {
    return str.indexOf('filemime=') !== -1 && str.indexOf('image') !== -1;
  }

  function findAttachmentByLabelName(labelName, attachmentList){
    let attachment = {};
    attachmentList.some(item => {
      if (item.label === labelName) {
        attachment = item;
        return true;
      }
    });
    return attachment;
  }
};

export const attachmentWriter = (filename, base64Content, cb) => {
  fs.outputFile(filename, new Buffer(base64Content, 'base64'), err => {
    if (err) console.error(err);
    if (typeof cb === 'function') return cb();
  });
};

export const lpadZero = (str, n) => (
    str.length < n ? lpadZero('0' + str, n) : str
);

export const getTistoryServerFileUrl = (item) => {
  let splited = item.name.split('.');
  if (item.$.mime.indexOf('image') !== -1) {
    return `http://${splited[0]}.${splited[1]}.tistory.com/attach/${splited[2]}`;
  } else {
    return `${config.YOUR_TISTORY_URL}/attachment/${item.name}`;
  }
};
