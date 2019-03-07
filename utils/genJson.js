module.exports = function genJson(rawJson){
  let newJson = {
    "games": []
  };
  rawJson.data.children.forEach(thread => {
    const data = thread.data;
    if(data.link_flair_richtext.some(e => e.t === "Post Game Thread")){
      let gameJson = {
        away: {},
        home: {}
      };
      gameJson.id = data.id;
      gameJson.scrimmage = data.title.includes("[Scrimmage]");
      const regex = /\*\*(.*?)\*\* @ .*?\*\*(.*?)\*\*[\s\S]*?:-:\n(.*?) yards\|(.*?) yards\|(.*?) yards\|(.*?)\|(.*?)\|(.*?)\/(.*?)\|(.*?)\|(.*?)\n[\s\S]*?:-:\n(.*?) yards\|(.*?) yards\|(.*?)yards\|(.*?)\|(.*?)\|(.*?)\/(.*?)\|(.*?)\|(.*?)\n[\s\S]*?:-:\n.*?\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|\*\*(.*?)\*\*\n.*?\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|\*\*(.*?)\*\*\n/gm;
      let match = regex.exec(data.selftext);
      if(match){
        match = match.slice(1,31);
        [gameJson.away.name,
          gameJson.home.name,
          gameJson.away.passYds,
          gameJson.away.rushYds,
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
      newJson.games.push(gameJson);
    }
  });
  return newJson;
}
