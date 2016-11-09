import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import {
    tistoryTagConverter,
    attachmentWriter,
    lpadZero,
    getTistoryServerFileUrl
} from '../app/parser/utils';
import attachement from './resource/attachment.png.js';
import attachementPdf from './resource/attachment.pdf.js';

describe('utils', () => {
  it('tistoryTagConverter', () => {
    // Given
    let tistoryTag = fs.readFileSync(path.join(__dirname, './resource/tistory-image-tag.md')).toString().trim();
    let expected = fs.readFileSync(path.join(__dirname, './resource/tistory-image-tag-converted.md')).toString().trim();

    //When
    let imageTag = tistoryTagConverter(tistoryTag);

    // Then
    expect(imageTag).to.equal(expected);
  });

  it('tistoryTagConverter - filename with whitespace', () => {
    // Given
    let tistoryTag = fs.readFileSync(path.join(__dirname, './resource/tistory-image-tag2.md')).toString().trim();
    let expected = fs.readFileSync(path.join(__dirname, './resource/tistory-image-tag2-converted.md')).toString().trim();

    //When
    let imageTag = tistoryTagConverter(tistoryTag);

    // Then
    expect(imageTag).to.equal(expected);
  });

  it('attachmentWriter', (done) => {
    // Given
    let filename = attachement.label;
    let base64Content = attachement.content;
    let baseDir = "./test/resource/";
    let filePathName = path.join(baseDir, filename);

    // When
    attachmentWriter(filePathName, base64Content, () => {

      // Then
      expect(fs.existsSync(filePathName)).to.equal(true);
      expect(fs.readFileSync(filePathName).toString('base64')).to.equal(base64Content);

      // Clean up
      fs.removeSync(filePathName);
      done();
    });
  });

  it('lpadZero', () => {
    // Given
    let numStr = '12';

    // When
    let parsed = lpadZero(numStr, 4);

    // Then
    expect(parsed).to.equal('0012');
  });

  it('getTistoryServerFileUrl - image file', () => {
    // Given
    // When
    let parsed = getTistoryServerFileUrl(attachement);

    // Then
    expect(parsed).to.equal('http://cfile22.uf.tistory.com/attach/252C1E4D514867F5135B59');
  });

  it('getTistoryServerFileUrl - non image', () => {
    // Given
    // When
    let parsed = getTistoryServerFileUrl(attachementPdf);

    // Then
    expect(parsed).to.equal('http://blog.doortts.com/attachment/49743879dde2d9C.pdf');
  })
});

