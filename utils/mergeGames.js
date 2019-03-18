module.exports = (oldJson, newJson) => {
  /* add games to json only if haven't already been added */
  newJson.games.forEach(game => {
    if(!oldJson.games.some(e => e.id === game.id)){
      oldJson.games.push(game);
    }
  });
  console.log(oldJson);
  return oldJson;
}