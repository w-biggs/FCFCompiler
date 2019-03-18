const promptTeam = require('../utils/promptTeam.js');
const promptFile = require('../utils/promptFile.js');
const teamGames = require('../utils/teamGames.js');
const {writeGames} = require('../utils/writeJson.js');
const stats = require('../utils/stats.js');

promptTeam((teamName) => {
  teamGames(teamName).then((json) => {
    if(json.games.length > 0){
      promptFile((json, fileName) => {
        writeGames(json, fileName, true);
        stats(json.games);
      }, json)
    }
  })
})