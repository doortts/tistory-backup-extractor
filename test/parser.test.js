import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { parseContent, commentFooter } from '../app/parser/commentParser';
import { timestampConverter } from '../app/parser/converter';
import comment from './resource/comment-01';
import post from './resource/post-01';

describe('Comment', () => {
  it('content - remove new line chars', () => {
    //Given
    let expectedString = fs.readFileSync(path.join(__dirname, './resource/comment.md')).toString();

    //When
    let parsed = parseContent(comment[0]);

    //Then
    expect(parsed).to.equal(expectedString);
  });

  it('timestampConverter', () => {
    //Given
    let timestamp = comment[0].written;

    //When
    let dateString = timestampConverter(timestamp);

    //Then
    expect(dateString).to.equal('2014년 3월 7일 금요일 오전 5:15');
  });

  it('commentFooter', () => {
    //Given
    //when
    let footer = commentFooter(comment[0]);

    //Then
    expect(footer).to.equal('- [Genie](http://jinself.tistory.com) 2014년 3월 7일 금요일 오전 5:15\n');
  });
});

describe('Post', () => {
  it('Header', () => {
    //Given
    let expectedString = fs.readFileSync(path.join(__dirname, './resource/post-header.md')).toString();

    //When
    let parsed = parseContent(comment[0]);

    //Then
    expect(parsed).to.equal(expectedString);
  });
});
