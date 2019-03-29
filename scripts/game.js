const promptGame = require('../utils/promptGame.js');
const promptFile = require('../utils/promptFile.js');
const singleGame = require('../utils/singleGame.js');
const {writeGames} = require('../utils/writeJson.js');
const stats = require('../utils/stats.js');

promptGame((gameID) => {
  singleGame(gameID).then((json) => {
    if(json.games.length > 0){
      promptFile((json, fileName) => {
        writeGames(json, fileName, true);
        //stats(json.games);
      }, json)
    }
  })
})