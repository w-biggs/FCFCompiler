const fs = require('fs');
const mergeGames = require('./mergeGames.js');

const writeGames = (json, merge = false, callback = () => {}) => {
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
      callback();
    }
  });
}

const writeStats = (json, callback = () => {}) => {
  fs.writeFile("./stats.json", JSON.stringify(json, null, 2), err => {
    if(err){
      console.log(err);
    } else {
      console.log("stats.json has successfully been written.");
      callback();
    }
  });
}

module.exports = {
  writeGames,
  writeStats
}