const fetchJson = require('../utils/fetchJson.js');
const {gameJson} = require('../utils/genJson.js');

module.exports = (team) => {
  return new Promise(function(resolve, reject){
    fetchJson(team, (rawJson) => {
      const newJson = gameJson(rawJson);
      resolve(newJson);
    })
  })
}