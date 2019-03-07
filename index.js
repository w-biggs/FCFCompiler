//const json = require('./bc.json');
const fs = require('fs');
const readline = require('readline');
const https = require('https');

const rl = readline.createInterface(process.stdin, process.stdout);

let reqUrl = "";

let json = {};

rl.setPrompt('Enter the name of a team. ');

rl.prompt();

rl.on('line', function(line) {
  reqUrl = "https://www.reddit.com/r/FakeCollegeFootball/search.json?q=flair%3APost%2BGame%2BThread%20" + line + "&sort=new&restrict_sr=on";
  rl.close();
}).on('close', function(){
  https.get(reqUrl, function(res){
    var body = '';
  
    res.on('data', function(chunk){
      body += chunk;
    });
  
    res.on('end', function(){
      rawJson = JSON.parse(body);
      const newJson = genJson(json);
      if(newJson.games.length > 0){
        fs.writeFile("./out.json", JSON.stringify(newJson, null, 2), err => {
          if(err){
            return console.log(err);
          }
          console.log("done!");
        });
      }
    });
  }).on('error', function(e){
    console.log("Got an HTTP error: ", e);
  });
});

const genJson = (rawJson) => {
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
      gameJson.scrimmage = data.title.includes("[Scrimmage]");
      const regex = /\*\*(.*?)\*\* @ .*?\*\*(.*?)\*\*[\s\S]*?:-:\n(.*?) yards\|(.*?) yards\|.*?yards\|(.*?)\|(.*?)\|(.*?)\/(.*?)\|(.*?)\|(.*?)\n[\s\S]*?:-:\n(.*?) yards\|(.*?) yards\|.*?yards\|(.*?)\|(.*?)\|(.*?)\/(.*?)\|(.*?)\|(.*?)\n[\s\S]*?:-:\n.*?\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|\*\*(.*?)\*\*\n.*?\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|\*\*(.*?)\*\*\n/gm;
      const match = regex.exec(data.selftext);
      if(match){
        match = match.slice(1,29);
        [gameJson.away.name,
          gameJson.home.name,
          gameJson.away.passYds,
          gameJson.away.rushYds,
          gameJson.away.ints,
          gameJson.away.fumbles,
          gameJson.away.fgm,
          gameJson.away.fga,
          gameJson.away.poss,
          gameJson.away.timeouts,
          gameJson.home.passYds,
          gameJson.home.rushYds,
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