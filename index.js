//const json = require('./bc.json');
const fs = require('fs');
var readline = require('readline');
var https = require('https');

var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Enter the name of a team. ');

rl.prompt();

let reqUrl = "";

let json = {};

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
      json = JSON.parse(body);

      let newJson = {
        "games": []
      };
      
      json.data.children.forEach(thread => {
        const data = thread.data;
        if(data.link_flair_richtext.some(e => e.t === "Post Game Thread")){
          let gameJson = {
            away: {},
            home: {}
          };
          //gameJson.title = data.title;
          gameJson.scrimmage = data.title.includes("[Scrimmage]");
          var regex = /\*\*(.*?)\*\* @ .*?\*\*(.*?)\*\*[\s\S]*?:-:\n(.*?) yards\|(.*?) yards\|.*?yards\|(.*?)\|(.*?)\|(.*?)\/(.*?)\|(.*?)\|(.*?)\n[\s\S]*?:-:\n(.*?) yards\|(.*?) yards\|.*?yards\|(.*?)\|(.*?)\|(.*?)\/(.*?)\|(.*?)\|(.*?)\n[\s\S]*?:-:\n.*?\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|\*\*(.*?)\*\*\n.*?\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|\*\*(.*?)\*\*\n/gm;
          var match = regex.exec(data.selftext);
          if(match){
            match = match.slice(1,29);
            gameJson.away.name = match[0];
            gameJson.home.name = match[1];
            gameJson.away.passYds = match[2];
            gameJson.away.rushYds = match[3];
            gameJson.away.ints = match[4];
            gameJson.away.fumbles = match[5];
            gameJson.away.fgm = match[6];
            gameJson.away.fga = match[7];
            gameJson.away.poss = match[8];
            gameJson.away.timeouts = match[9];
            gameJson.home.passYds = match[10];
            gameJson.home.rushYds = match[11];
            gameJson.home.ints = match[12];
            gameJson.home.fumbles = match[13];
            gameJson.home.fgm = match[14];
            gameJson.home.fga = match[15];
            gameJson.home.poss = match[16];
            gameJson.home.timeouts = match[17];
            gameJson.home.q1 = match[18];
            gameJson.home.q2 = match[19];
            gameJson.home.q3 = match[20];
            gameJson.home.q4 = match[21];
            gameJson.home.score = match[22];
            gameJson.away.q1 = match[23];
            gameJson.away.q2 = match[24];
            gameJson.away.q3 = match[25];
            gameJson.away.q4 = match[26];
            gameJson.away.score = match[27];
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
      
      fs.writeFile("./out.json", JSON.stringify(newJson, null, 2  ), err => {
        if(err){
          return console.log(err);
        }
        console.log("done!");
      });
    });
  }).on('error', function(e){
      console.log("Got an HTTP error: ", e);
  });
});