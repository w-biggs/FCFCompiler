const fetchJson = require('../utils/fetchJson.js');
const {gameJson} = require('../utils/genJson.js');

module.exports = (gameID) => {
  return new Promise(function(resolve, reject){
    fetchJson(gameID, (rawJson) => {
      const newJson = gameJson(rawJson, true);
      resolve(newJson);
    }, true)
  })
}