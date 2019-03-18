const readline = require('readline');

module.exports = (callback) => {
  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt('Enter the ID of a game. ');
  
  rl.prompt();

  let gameID = "";
  
  rl.on('line', function(line) {
    gameID = line;
    rl.close();
  }).on('close', () => {
    callback(gameID);
  })
}