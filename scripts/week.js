const promptFile = require('../utils/promptFile.js');
const teams = require('../config/teams.json');
const {writeGames} = require('../utils/writeJson.js');
const mergeGames = require('../utils/mergeGames.js');
const batchGames = require('../utils/batchGames.js');
const filterWeek = require('../utils/filterWeek.js');
const stats = require('../utils/stats.js');

let gamesJson = {
  games: []
}

batchGames(teams.fcs).then((results) => {
  results.forEach(result => {
    if(result.games.length > 0){
      result = filterWeek(result, 9);
      gamesJson = mergeGames(gamesJson, result);
    }
  });
  promptFile((gamesJson, fileName) => {
    writeGames(gamesJson, fileName, true);
    //stats(json.games, 'fcs');
  }, gamesJson);
});