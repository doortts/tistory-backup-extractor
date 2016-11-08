import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { createHeader, replaceTistoryCustomImageTag } from '../app/parser/postParser';
import post from './resource/post-01';


describe('postParser', () => {
  it('Header', () => {
    //Given
    let expectedString = fs.readFileSync(path.join(__dirname, './resource/post-header.md')).toString().trim();

    //When
    let parsed = createHeader(post);

    //Then
    expect(parsed).to.equal(expectedString);
  });

});
