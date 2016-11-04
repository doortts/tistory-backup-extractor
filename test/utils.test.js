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
  it('timestampConverter', () => {
    // Given
    let timestamp = comment[0].written;

    // When
    let dateString = timestampConverter(timestamp);

    // Then
    expect(dateString).to.equal('2014년 3월 7일 금요일 오전 5:15');
  });

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
    let filename = attachement.label[0];
    let base64Content = attachement.content[0];
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

