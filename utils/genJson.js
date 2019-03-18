/* Nov. 28, 2019 - Season Two Begins */
const season = 1543363200.0;

const gameJson = (rawJson, single) => {
  let newJson = {
    "games": []
  };
  rawJson.data.children.forEach((thread) => {
    const data = thread.data;
    if(data.created_utc > season && (data.link_flair_richtext.some(e => e.t === "Post Game Thread") || single)){
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
      newJson.games.push(gameJson);
    }
  });
  return newJson;
}

module.exports = {
  gameJson
}