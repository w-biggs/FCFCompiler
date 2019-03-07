const fs = require('fs');

const writeGames = (json) => {
  fs.readFile('./games.json', function (err, data) {
    if(err){
      fs.writeFile("./games.json", JSON.stringify(json, null, 2), err => {
        if(err){
          return console.log(err);
        }
        console.log("JSON has been written to ./games.json");
      });
    } else {
      const oldJson = JSON.parse(data);
      /* add games to json only if haven't already been added */
      json.games.forEach(game => {
        if(!oldJson.games.some(e => e.id === game.id)){
          oldJson.games.push(game);
        }
      });
      fs.writeFile("./games.json", JSON.stringify(oldJson, null, 2), err => {
        if(err){
          return console.log(err);
        }
        console.log("JSON has been appended to ./games.json");
      });
    }
  });
}

module.exports = {
  writeGames
}