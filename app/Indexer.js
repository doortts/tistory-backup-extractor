import fse from 'fs-extra';
import path from 'path';
import config from '../config';

class Indexer {
  constructor() {
    this.list = [];
  }

  addPost(post) {
    this.post = post;
    let item = {
      no: post.post.id,
      name: post.post.title,
      filename: post.getSuggestedFilename(),
      link: post.slogan + ".md"
    };

    this.list.push(item);
  }

  out() {
    var indexer = '';
    this.list.forEach(item => {
      indexer += `- [${item.no}. ${item.name}](${item.filename.replace(/.md$/, '')})\n`;
    });
    fse.outputFileSync(path.join(config.baseDir, './Home.md'), indexer);
    this.list = [];
  }
}

export default Indexer;
