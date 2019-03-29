const https = require('https');

module.exports = (toSearch, callback, single) => {
  if(typeof toSearch === 'undefined'){
    toSearch = "";
  }
  let url = "";
  if(single){
    url = "https://www.reddit.com/api/info.json?id=t3_" + toSearch;
  } else {
    url = "https://www.reddit.com/r/FakeCollegeFootball/search.json?q=-flair:%22Post+Game+Thread%22%20%22" + toSearch + "%22&sort=new&restrict_sr=on&limit=100";
  }
  https.get(url, function(res){
    var body = '';
  
    res.on('data', function(chunk){
      body += chunk;
    });
  
    res.on('end', function(){
      rawJson = JSON.parse(body);
      console.log("Successfully fetched JSON for " + toSearch);
      callback(rawJson);
    });
  }).on('error', function(e){
    console.log("Got an HTTP error: ", e);
  });
}