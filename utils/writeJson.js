const fs = require('fs');
const mergeGames = require('./mergeGames.js');

const writeGames = (json, fileName = "games", merge = false, callback = () => {}) => {
  if(merge){
    fs.readFile("./output/" + fileName + ".json", function (err, data) {
      if(!err){
        const oldJson = JSON.parse(data);
        json = mergeGames(oldJson, json);
      } else {
        console.log("Could not load " + fileName + ".json; creating/overwriting it.")
      }
      writeJson(fileName, json, callback);
    })
  } else {
    writeJson(fileName, json, callback);
  }
}

const writeStats = (json, callback = () => {}) => {
  writeJson('stats', json, callback);
}

const writeJson = (fileName, json, callback) => {
  fs.writeFile("./output/" + fileName + ".json", JSON.stringify(json, null, 2), err => {
    if(err){
      console.log(err);
    } else {
      console.log("./output/" + fileName + ".json has successfully been written.");
      callback();
    }
  });
}

module.exports = {
  writeGames,
  writeStats
}