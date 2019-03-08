const {writeStats} = require('./writeJson.js');

const Team = {
  name: "",
  offPassYds: 0,
  defPassYds: 0,
  offRushYds: 0,
  defRushYds: 0,
  offTotalYds: 0,
  defTotalYds: 0,
  offInts: 0,
  defInts: 0,
  offFum: 0,
  defFum: 0,
  fgm: 0,
  fga: 0,
  pf: 0,
  pa: 0,
  wins: 0,
  losses: 0,
  ties: 0
}

let stats = [];

module.exports = (games) => {
  games.forEach(game => {
    if(game.scrimmage){
      return;
    }
    let homeIndex = stats.findIndex(team => team.name === game.home.name);
    let awayIndex = stats.findIndex(team => team.name === game.away.name);

    if(homeIndex < 0){
      homeIndex = stats.push(Object.create(Team)) - 1;
    }
    if(awayIndex < 0){
      awayIndex = stats.push(Object.create(Team)) - 1;
    }

    stats[homeIndex].name = game.home.name;
    stats[homeIndex].offPassYds += Number(game.home.passYds);
    stats[homeIndex].offRushYds += Number(game.home.rushYds);
    stats[homeIndex].offTotalYds += Number(game.home.yds);
    stats[homeIndex].offInts += Number(game.home.ints);
    stats[homeIndex].offFum += Number(game.home.fumbles);
    stats[homeIndex].fga += Number(game.home.fga);
    stats[homeIndex].fgm += Number(game.home.fgm);
    stats[homeIndex].pf += Number(game.home.score);
    stats[homeIndex].defPassYds += Number(game.away.passYds);
    stats[homeIndex].defRushYds += Number(game.away.rushYds);
    stats[homeIndex].defTotalYds += Number(game.away.yds);
    stats[homeIndex].defInts += Number(game.away.ints);
    stats[homeIndex].defFum += Number(game.away.fumbles);
    stats[homeIndex].pa += Number(game.away.score);

    stats[awayIndex].name = game.away.name;
    stats[awayIndex].offPassYds += Number(game.away.passYds);
    stats[awayIndex].offRushYds += Number(game.away.rushYds);
    stats[awayIndex].offTotalYds += Number(game.away.yds);
    stats[awayIndex].offInts += Number(game.away.ints);
    stats[awayIndex].offFum += Number(game.away.fumbles);
    stats[awayIndex].fga += Number(game.away.fga);
    stats[awayIndex].fgm += Number(game.away.fgm);
    stats[awayIndex].pf += Number(game.away.score);
    stats[awayIndex].defPassYds += Number(game.home.passYds);
    stats[awayIndex].defRushYds += Number(game.home.rushYds);
    stats[awayIndex].defTotalYds += Number(game.home.yds);
    stats[awayIndex].defInts += Number(game.home.ints);
    stats[awayIndex].defFum += Number(game.home.fumbles);
    stats[awayIndex].pa += Number(game.home.score);

    if(game.home.score > game.away.score){
      stats[homeIndex].wins++;
      stats[awayIndex].losses++;
    } else if (game.home.score < game.away.score){
      stats[awayIndex].wins++;
      stats[homeIndex].losses++;
    } else {
      stats[homeIndex].ties++;
      stats[awayIndex].ties++;
    }
  });
  writeStats(stats);
}