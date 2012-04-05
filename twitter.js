var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');

var client = redis.createClient();

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

t.stream(
    'statuses/filter',
    { track: ['awesome','linux'] },
    function(stream) {
        var awesome = 0;
        var linux = 0;
        stream.on('data', function(tweet) {
            if(tweet.text.match(/awesome/)) {
               if(tweet.entities.urls[0]) {
                 console.log(tweet.entities.urls[0].expanded_url);
                 client.lpush('links',tweet.entities.urls[0].expanded_url);
                 awesome = awesome + 1;
                 if (awesome > 10) {
                   client.rpop('links');
                   console.log("POP:awesome");
                 }
               }
            }
            if(tweet.text.match(/linux/)) {
               if(tweet.entities.urls[0]) {
                 console.log(tweet.entities.urls[0].expanded_url);
                 client.lpush('linux',tweet.entities.urls[0].expanded_url);
                 linux = linux + 1;
                 if (linux > 10){
                   client.rpop('linux');
                   console.log("POP:linux");
                 }
               }
            }
        });
    }
);
