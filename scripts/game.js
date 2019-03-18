const promptGame = require('../utils/promptGame.js');
const singleGame = require('../utils/singleGame.js');
const {writeGames} = require('../utils/writeJson.js');
const stats = require('../utils/stats.js');

promptGame((gameID) => {
  singleGame(gameID).then((json) => {
    console.log(json.games.length);
    if(json.games.length > 0){
      writeGames(json, true);
      stats(json.games);
    }
  })
})