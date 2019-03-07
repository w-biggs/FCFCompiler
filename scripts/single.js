const promptTeam = require('../utils/promptTeam.js');
const teamGames = require('../utils/teamGames.js');
const {writeGames} = require('../utils/writeJson.js');

promptTeam((teamName) => {
  teamGames(teamName).then((json) => {
    if(json.games.length > 0){
      writeGames(json, true);
    }
  })
})