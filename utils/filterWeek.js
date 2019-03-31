module.exports = (json, weekNo) => {
  json.games.forEach((game, index) => {
    if(game.week !== weekNo){
      delete json.games[index];
    }
  });
  return json;
}