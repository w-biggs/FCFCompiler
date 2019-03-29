/* Nov. 17, 2019 - Season Two Begins */
const season = 1542412800;

const gameJson = (rawJson, single) => {
  let newJson = {
    "games": []
  };
  rawJson.data.children.forEach((thread) => {
    const data = thread.data;
    if(data.created_utc > season && data.link_flair_richtext.some(e => e.t === "Game Thread")){
      let gameJson = {
        away: {},
        home: {}
      };
      gameJson.id = data.id;
      gameJson.date_utc = data.created_utc;
      gameJson.scrimmage = data.title.includes("[Scrimmage]");
      const regex = /\*\*(.*?)\*\* @ .*?\*\*(.*?)\*\*[\s\S]*?:-:\n(.*?) yards\|(.*?) yards\|(.*?) yards\|(.*?)\|(.*?)\|(.*?)\/(.*?)\|(.*?)\|(.*?)\n[\s\S]*?:-:\n(.*?) yards\|(.*?) yards\|(.*?)yards\|(.*?)\|(.*?)\|(.*?)\/(.*?)\|(.*?)\|(.*?)\n[\s\S]*?:-:\n.*?\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|\*\*(.*?)\*\*\n.*?\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|\*\*(.*?)\*\*\n/gm;
      let match = regex.exec(data.selftext);
      if(match){
        match = match.slice(1,31);
        [gameJson.away.name,
          gameJson.home.name,
          gameJson.away.rushYds,
          gameJson.away.passYds,
          gameJson.away.yds,
          gameJson.away.ints,
          gameJson.away.fumbles,
          gameJson.away.fgm,
          gameJson.away.fga,
          gameJson.away.poss,
          gameJson.away.timeouts,
          gameJson.home.passYds,
          gameJson.home.rushYds,
          gameJson.home.yds,
          gameJson.home.ints,
          gameJson.home.fumbles,
          gameJson.home.fgm,
          gameJson.home.fga,
          gameJson.home.poss,
          gameJson.home.timeouts,
          gameJson.home.q1,
          gameJson.home.q2,
          gameJson.home.q3,
          gameJson.home.q4,
          gameJson.home.score,
          gameJson.away.q1,
          gameJson.away.q2,
          gameJson.away.q3,
          gameJson.away.q4,
          gameJson.away.score] = match;
        const awayPoss = gameJson.away.poss.split(':');
        gameJson.away.poss = (parseInt(awayPoss[0],10) * 60) + parseInt(awayPoss[1],10);
        const homePoss = gameJson.home.poss.split(':');
        gameJson.home.poss = (parseInt(homePoss[0],10) * 60) + parseInt(homePoss[1],10);
        gameJson.gameLength = gameJson.away.poss + gameJson.home.poss;
      } else {
        return console.log("No games found.");
      }
      if(data.selftext.includes("[Plays]")){
        const pasteIndex = data.selftext.indexOf("[Plays](") + 1;
        gameJson.pastebin = data.selftext.substring(
          data.selftext.indexOf("http", pasteIndex),
          data.selftext.indexOf(")", pasteIndex)
        );
      } 
      if(single && data.selftext.includes("Quarter")){
        const qTable = "Deadline\n:-:|:-:|:-:|:-:|:-:|:-:|:-:\n";
        const qI = data.selftext.indexOf(qTable) + qTable.length;
        const subst = data.selftext.substring(qI);
        const qRegex = /^([0-9]*:[0-9]*)\|([0-9])/;
        const info = qRegex.exec(subst);
        if(info[1] !== "0:00" || info[2] !== "4"){
          gameJson.quarter = info[2];
        }
      }
      const weeks = [
        1542412800, // Nov 17 - Week 0
        1543363200, // Nov 28 - Week 1
        1544572800, // Dec 12 - Week 2
        1545696000, // Dec 25 - Week 3
        1546905600, // Jan 8 - Week 4
        1548115200, // Jan 22 - Week 5
        1549324800, // Feb 5 - Week 6
        1550534400, // Feb 19 - Week 7
        1551744000, // Mar 5 - Week 8
        1552953600, // Mar 19 - Week 9
        1554163200, // Apr 2 - Week 10
        1555372800, // Apr 16 - Week 11
        1556582400  // Apr 30 - Week 12
      ];
      weeks.forEach((date, week) => {
        if(data.created_utc > date){
          gameJson.week = week;
        }
      });
      if(gameJson.gameLength > 0){
        newJson.games.push(gameJson);
      }
    }
  });
  return newJson;
}

module.exports = {
  gameJson
}