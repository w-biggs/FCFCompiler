module.exports = (callback) => {
  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt('Enter the name of a team. ');
  
  rl.prompt();

  let teamName = "";
  
  rl.on('line', function(line) {
    teamName = line;
    rl.close();
  }).on('close', () => {
    callback(teamName);
  })
}