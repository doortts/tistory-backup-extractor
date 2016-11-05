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

  it('replaceTistoryCustomImageTag - simple ', () => {
    //Given
    let actualString = "감자나라 \n[## abc filename=\"potato.png\" ##]고구마입니다 \n";

    //When
    let parsed = replaceTistoryCustomImageTag(actualString);

    //Then
    expect(parsed).to.equal("감자나라 \n![potato.png](./attachments/potato.png)고구마입니다 \n");
  });

  it('replaceTistoryCustomImageTag ', () => {
    //Given
    let actualString = fs.readFileSync(path.join(__dirname, './resource/content-mark.md')).toString().trim();
    let expectedString = fs.readFileSync(path.join(__dirname, './resource/content-mark-correct.md')).toString().trim();

    //When
    let parsed = replaceTistoryCustomImageTag(actualString);

    //Then
    expect(parsed).to.equal(expectedString);
  });
});
