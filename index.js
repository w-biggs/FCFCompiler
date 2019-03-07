//const json = require('./bc.json');
const teams = require('./config/teams.json');
const fs = require('fs');
const readline = require('readline');
const https = require('https');
const authorize = require('./utils/google.js');
const {gameJson} = require('./utils/genJson.js');
const writeSheet = require('./utils/writeSheet.js');

const fetchJson = (teamName) => {
  if(typeof teamName === 'undefined'){
    teamName = "";
  }
  const url = "https://www.reddit.com/r/FakeCollegeFootball/search.json?q=flair%3APost%2BGame%2BThread%20" + teamName + "&sort=new&restrict_sr=on&limit=100";
  https.get(url, function(res){
    var body = '';
  
    res.on('data', function(chunk){
      body += chunk;
    });
  
    res.on('end', function(){
      rawJson = JSON.parse(body);
      const newJson = gameJson(rawJson);
      if(newJson.games.length > 0){
        writeJson(newJson);
        authorize((auth) => {
          writeSheet(auth, newJson);
        });
      }
    });
  }).on('error', function(e){
    console.log("Got an HTTP error: ", e);
  });
}

const writeJson = (json) => {
  fs.readFile('./out.json', function (err, data) {
    if(err){
      fs.writeFile("./out.json", JSON.stringify(json, null, 2), err => {
        if(err){
          return console.log(err);
        }
        console.log("JSON has been written to ./out.json");
      });
    } else {
      const oldJson = JSON.parse(data);
      /* add games to json only if haven't already been added */
      json.games.forEach(game => {
        if(!oldJson.games.some(e => e.id === game.id)){
          oldJson.games.push(game);
        }
      });
      fs.writeFile("./out.json", JSON.stringify(oldJson, null, 2), err => {
        if(err){
          return console.log(err);
        }
        console.log("JSON has been appended to ./out.json");
      });
    }
  });
}

const promptTeam = () => {
  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt('Enter the name of a team. ');
  
  rl.prompt();
  
  rl.on('line', function(line) {
    fetchJson(line);
    rl.close();
  })
}

promptTeam();