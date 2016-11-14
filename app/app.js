import ProgressBar from 'ascii-progress';
import Analyzer from './parser/analyzer';
import Indexer from './Indexer';
import YonaExport from './yonaExport';
import config from '../config';

var indexer = new Indexer();

var counter = 0;
var yonaExport = new YonaExport();

async function main() {
  process.stdout.write('Analying...');

  let status = await new Analyzer().analyze();

  console.log('Ready!');
  console.log('----------------------------');
  console.log(`발행글: ${status.done}, 비밀글: ${status.skip}`);
  console.log('----------------------------\n');

  let bar = createProgressBar(status.done);
  bar.tick();

  /**
   * 1. 파일로 저장하고
   * 2. 인덱스파일(Home.md) 만들고
   * 3. config 에 YONA.DO_EXPORT 를 true 지정했으면 Yona로 보냄
   * @param post
   */
  const handlePost = post => {
    try {
      post.writeToFile();
      indexer.addPost(post);
      if(config.YONA.DO_EXPORT){
        // 의도적으로 요청을 100ms 지연시킴. Why? 본의아니게 DOS 공격이 되지 않도록..
        setTimeout(() => { bar.tick(); yonaExport.pushFiles(post) }, counter * 100 + 3000);
      } else {
        bar.tick();
      }
      counter++;
    } catch (e) {
      console.error(e);
    }
  };

  await new Analyzer().analyze(handlePost);
}

main();

////////////////////////////////////

function createProgressBar(total) {
  return new ProgressBar({
    schema: ' [:bar] \n:current/:total \n:percent \n:elapseds :etas',
    callback: function () {
      console.log('Done!');
    },
    total: total
  });
}

