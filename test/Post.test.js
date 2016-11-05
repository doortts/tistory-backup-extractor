import { expect } from 'chai';

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

  it('doc', () => {
    // Given
    var post = new Post(postJson);

    // When
    let parsed = post.doc();

    // Then
    expect(parsed).to.equal('2014-03-07 금요일 오전 5:15');
  });
});

