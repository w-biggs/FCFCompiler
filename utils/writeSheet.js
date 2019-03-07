const {google} = require('googleapis');

module.exports = (auth, stats) => {
  const sheets = google.sheets({version: 'v4', auth});
  const statsArray = jsonToArray(stats);
  const resource = {
    values: statsArray
  };
  sheets.spreadsheets.values.update({
    spreadsheetId: process.env.STAT_SHEET,
    range: 'Sheet1!A2',
    valueInputOption: "USER_ENTERED",
    resource
  }, (err, result) => {
    if (err) {
      // Handle error.
      console.log(err);
      //console.log("error!");
    } else {
      console.log("Sheet has been updated!");
    }
  });
}

const jsonToArray = (json) => {
  let cells = [];
  json.games.forEach(game => {
    cells.push(teamRow(game.home));
    cells.push(teamRow(game.away));
    cells.push([]);
  });
  return cells;
}

const teamRow = (team) => {
  return [
    team.name,
    team.passYds,
    team.rushYds,
    team.ints,
    team.fumbles,
    team.fgm,
    team.fga,
    team.poss,
    team.timeouts,
    team.q1,
    team.q2,
    team.q3,
    team.q4,
    team.score
  ]
}