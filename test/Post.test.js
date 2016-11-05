import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import postJson from './resource/post-02';
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
    expect(parsed).to.equal('| 2011-10-24 월요일 오전 1:12} | node.js (OctoberSkyJs)\n\n');

  });

  it('getSuggestedFilename', () => {
    // Given
    let post = new Post(postJson);

    // When
    let parsed = post.getSuggestedFilename();

    // Then
    expect(parsed).to.equal('00205-20111024-기간한정-자바스크립트-학습모임-Octoberskyjs');
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
});

