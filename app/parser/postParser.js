import matter from 'gray-matter';
import { tistoryImageTagConverter, timestampConverter } from '../parser/utils';

export const createHeader = (post) => {
  let header = {
    id: parseInt(post.id),
    slogan: post.$.slogan,
    title: post.title,
    created: parseInt(post.published || post.created),
    category: post.category,
    visibility: post.visibility
  };

  return matter.stringify('', header).trim();
};

export const replaceTistoryCustomImageTag = (content) => {
  return content.replace(/\[##(.*?)##]/g, a => {
    return tistoryImageTagConverter(a);
  });
};

export default {
  createHeader,
  replaceTistoryCustomImageTag
}
