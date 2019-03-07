const fs = require('fs');
const mergeGames = require('./mergeGames.js');

const writeGames = (json, merge = false) => {
  if(merge){
    fs.readFile('./games.json', function (err, data) {
      if(!err){
        const oldJson = JSON.parse(data);
        json = mergeGames(oldJson, json);
      } else {
        console.log("Could not load games.json; creating/overwriting it.")
      }
    })
  }
  fs.writeFile("./games.json", JSON.stringify(json, null, 2), err => {
    if(err){
      console.log(err);
    } else {
      console.log("games.json has successfully been written.");
    }
  });
}

module.exports = {
  writeGames
}