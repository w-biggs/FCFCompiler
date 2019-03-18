const fs = require('fs');
const stats = require('../utils/stats.js');

if(process.argv.length > 2){
  const fileName = process.argv[2];
  fs.readFile("./output/" + fileName + ".json", function (err, data) {
    if(!err){
      const json = JSON.parse(data);
      stats(json.games, fileName);
    } else {
      console.error("Could not load ./output/" + fileName + ".json.")
    }
  })
} else {
  console.error("An input file (without extension) must be provided.")
}