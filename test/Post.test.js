import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import postJson from './resource/post-02';
import postWithAttachment from './resource/post-with-attachment.md';
import Post from '../app/Post';

describe('Post', () => {
  let post;

  beforeEach(() => {
  });

  it('getPostDetail', () => {
    // Given
    var post = new Post(postJson);

    // When
    let parsed = post.getPostDetail();

    // Then
    expect(parsed).to.equal('> doortts | 2011-10-24 월요일 오전 1:12 | node.js (OctoberSkyJs) |' +
        ' [원본](http://blog.doortts.com/205)\n\n');
  });

  it('getSuggestedFilename', () => {
    // Given
    let post = new Post(postJson);

    // When
    let parsed = post.getSuggestedFilename();

    // Then
    expect(parsed).to.equal('00205-20111024-기간한정-자바스크립트-학습모임-Octoberskyjs.md');
  });

  it('doc', () => {
    // Given
    var post = new Post(postJson);
    let expected = fs.readFileSync(path.join(__dirname, './resource/post-02-parsed.md')).toString();

    // When
    let parsed = post.doc();

    // Then
    expect(parsed).to.equal(expected);
  });


  it('replaceTistoryCustomImageTag - simple ', () => {
    //Given
    let actualString = "감자나라 \n[##_1C|cfile30.uf.11613F345148691C3095BD.png|width=\"665\" height=\"361\" filename=\"potato.png\" filemime=\"image/jpeg\"|_##]고구마입니다 \n";
    var post = new Post(postJson);

    //When
    let parsed = post.replaceTistoryCustomImageTag(actualString);

    //Then
    expect(parsed).to.equal("감자나라 \n![potato.png](./attachments/potato.png)고구마입니다 \n");
  });

  it('replaceTistoryCustomImageTag - old post ', () => {
    //Given
    var post = new Post(postWithAttachment);

    //When
    let parsed = post.replaceTistoryCustomImageTag();

    //Then
    expect(parsed).to.equal("![zrclip_004n7fb407e0.png](./attachments/zrclip_004n7fb407e0.png)\n\n서점에 봤을때는 사실 눈에 잘 안들어 왔는데, 서평이 나쁘지 않아서 다시금 관심이...");
  });

  it('replaceTistoryCustomImageTag ', () => {
    //Given
    var post = new Post(postJson);
    let actualString = fs.readFileSync(path.join(__dirname, './resource/content-mark.md')).toString().trim();
    let expectedString = fs.readFileSync(path.join(__dirname, './resource/content-mark-correct.md')).toString().trim();

    //When
    let parsed = post.replaceTistoryCustomImageTag(actualString);

    //Then
    expect(parsed).to.equal(expectedString);
  });
});

