import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'path';
import {
    timestampConverter,
    tistoryImageTagConverter,
    attachmentWriter
} from '../app/parser/utils';
import comment from './resource/comment-01';
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
    // fs.removeSync(filePathName);
  });

});

