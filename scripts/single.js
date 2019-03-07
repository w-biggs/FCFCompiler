const promptTeam = require('../utils/promptTeam.js');
const fetchJson = require('../utils/fetchJson.js');
const {gameJson} = require('../utils/genJson.js');
const {writeGames} = require('../utils/writeJson.js');

promptTeam((teamName) => {
  fetchJson(teamName, (rawJson) => {
    const newJson = gameJson(rawJson);
    if(newJson.games.length > 0){
      writeGames(newJson);
    }
  })
})