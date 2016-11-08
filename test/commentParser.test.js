import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { parseComment, commentFooter, parseCommentList } from '../app/parser/commentParser';
import comment from './resource/comment-01';

describe('commentParser', () => {
  it('parseComment', () => {
    //Given
    let expectedString = fs.readFileSync(path.join(__dirname, './resource/comment.md')).toString();

    //When
    let parsed = parseComment(comment[0]);

    //Then
    expect(parsed).to.equal(expectedString);
  });

  it('commentFooter', () => {
    //Given
    //when
    let footer = commentFooter(comment[0]);

    //Then
    expect(footer).to.equal(' [Genie](http://jinself.tistory.com) | 2014-03-07 금요일 오전 5:15\n');
  });

  it('parse comments list', () => {
    //Given
    let expectedString = fs.readFileSync(path.join(__dirname, './resource/commentList.md')).toString();

    //when
    let parsed = parseCommentList(comment);

    //Then
    expect(parsed).to.equal(expectedString);
  });

});

