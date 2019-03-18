const readline = require('readline');

module.exports = (callback, json) => {
  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt('Enter a filename (without extension) to save to. ');
  
  rl.prompt();

  let fileName = "";
  
  rl.on('line', function(line) {
    fileName = line;
    rl.close();
  }).on('close', () => {
    callback(json, fileName);
  })
}