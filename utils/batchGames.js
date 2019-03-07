const teamGames = require('../utils/teamGames.js');

module.exports = (teams) => {
  console.log(teams);
  let teamJsons = [];
  teams.forEach(team => {
    teamJsons.push(teamGames(team));
  });
  return Promise.all(teamJsons);
};