import matter from 'gray-matter';
import { tistoryImageTagConverter } from '../parser/utils';

export const createHeader = (post) => {
  let header = {
    id: parseInt(post.id[0]),
    slogan: post.$.slogan,
    title: post.title[0],
    created: parseInt(post.published[0] || post.created[0]),
    category: post.category[0],
    visibility: post.visibility[0]
  };

  return matter.stringify('', header).trim();
};

export const replaceTistoryCustomImageTag = (post) => {
  return post.replace(/\[##(.*?)##]/g, a => {
    return tistoryImageTagConverter(a);
  });
};
