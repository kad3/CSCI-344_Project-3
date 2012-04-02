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
    { track: ['awesome'] },
    function(stream) {
        stream.on('data', function(tweet) {
            if(tweet.text.match(/awesome/)) {
               if(tweet.entities.urls[0]) {
                 console.log(tweet.entities.urls[0].expanded_url);
                 client.rpush('links',tweet.entities.urls[0].expanded_url);
               }
            }

        });
    }
);
