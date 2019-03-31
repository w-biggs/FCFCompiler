const fcs = require('./output/fcs.json');
const fs = require('fs');

let teams = {}

const pushTeam = (team, opp, isWin) => {
  let result = ""
  if(isWin){
    result = "wins";
  } else {
    result = "losses";
  }
  if(!(team in teams)){
    teams[team] = {
      "wins": [],
      "losses": []
    }
  }
  teams[team][result].push(opp);
}

fcs.games.forEach(game => {
  let winner = "";
  let loser = "";
  const aScore = Number(game.away.score);
  const hScore = Number(game.home.score);
  if(game.scrimmage){
    return;
  }
  if(aScore > hScore){
    winner = game.away.name;
    loser = game.home.name;
  } else if (hScore > aScore){
    winner = game.home.name;
    loser = game.away.name;
  } else {
    return;
  }
  pushTeam(winner, loser, true);
  pushTeam(loser, winner, false);
});

fs.writeFile("./output/wl.json", JSON.stringify(teams, null, 2), err => {
  if(err){
    console.log(err);
  } else {
    console.log("./output/wl.json has successfully been written.");
  }
});