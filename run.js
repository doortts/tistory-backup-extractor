import Analyzer from './app/parser/analyzer';

async function f(){
  var a = new Analyzer();
  let result = await a.analyze();
  console.log(result);
}

f();


