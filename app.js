var Cylon = require('cylon');
var Gpio = require('onoff').Gpio;
var Twitter = require('twitter');
const dotenv = require('dotenv');

var numbertweets = 0;
dotenv.config();
var LED = new Gpio(24, 'out');
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, 
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var follow = {follow: process.env.FOLLOW_USERID}
var followUserName = process.env.FOLLOW_USERNAME;
console.log("starting robot");
Cylon.robot({
    connections: {
      raspi: { adaptor: 'raspi' }
    },
    
     work: function(raspi) {
        console.log("calling twitter");
        client.stream('statuses/filter', { follow}, function (stream) {
            console.log("Checking for @" + followUserName + " tweets");
            stream.on('data', function (data) {
                if (data.user.screen_name==followUserName)
                {
                    numbertweets++;
                    
                    console.log("@" + followUserName + " Tweeted");
                    console.log("@" + data.user.screen_name + " :: " + data.text);
                    
                    LED.writeSync(1); // turn light on
                    setTimeout(function () {LED.writeSync(0);}, 2000);
                }
                
            });
        });
    }
}).start();

