module.exports = (teamName, callback) => {
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
        console.log("Successfully fetched JSON for " + teamName);
        callback();
        /*writeJson(newJson);
        authorize((auth) => {
          writeSheet(auth, newJson);
        });*/
      }
    });
  }).on('error', function(e){
    console.log("Got an HTTP error: ", e);
  });
}