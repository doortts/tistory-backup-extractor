import matter from 'gray-matter';

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

export default {
  createHeader
};
