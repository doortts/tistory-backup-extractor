import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import {
    tistoryImageTagConverter,
    attachmentWriter,
    lpadZero,
    getTistoryServerFileUrl
} from '../app/parser/utils';
import attachement from './resource/attchment.png.js';

describe('utils', () => {
  it('tistoryImageTagConverter', () => {
    // Given
    let tistoryTag = fs.readFileSync(path.join(__dirname, './resource/tistory-image-tag.md')).toString().trim();
    let expected = fs.readFileSync(path.join(__dirname, './resource/tistory-image-tag-converted.md')).toString().trim();

    //When
    let imageTag = tistoryImageTagConverter(tistoryTag);

    // Then
    expect(imageTag).to.equal(expected);
  });

  it('attachmentWriter', () => {
    // Given
    let filename = attachement.label;
    let base64Content = attachement.content;
    let baseDir = "./test/resource/";
    let filePathName = path.join(baseDir, filename);

    // When
    attachmentWriter(filePathName, base64Content);

    // Then
    expect(fs.existsSync(filePathName)).to.equal(true);
    expect(fs.readFileSync(filePathName).toString('base64')).to.equal(base64Content);

    // Clean up
    fs.removeSync(filePathName);
  });

  it('lpadZero', () => {
    // Given
    let numStr = '12';

    // When
    let parsed = lpadZero(numStr, 4);

    // Then
    expect(parsed).to.equal('0012');
  });

  it('getTistoryUrl', () => {
    // Given
    let remoteFileName = 'cfile22.uf.252C1E4D514867F5135B59.png';

    // When
    let parsed = getTistoryServerFileUrl(remoteFileName);

    // Then
    expect(parsed).to.equal('http://cfile22.uf.tistory.com/attach/252C1E4D514867F5135B59');
  })
});

