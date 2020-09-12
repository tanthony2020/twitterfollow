var Cylon = require('cylon');
var Gpio = require('onoff').Gpio;
var Twitter = require('twitter');
const dotenv = require('dotenv');

dotenv.config();
var LED = new Gpio(24, 'out');
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, 
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = {screen_name: 'tammi_jo_'};
console.log("starting robot");
Cylon.robot({
    connections: {
      raspi: { adaptor: 'raspi' }
    },
    
     work: function(raspi) {
        console.log("calling twitter");
        client.stream('statuses/filter', { follow: '25073877'}, function (stream) {
            //console.log("client stream created");
            console.log("Checking for trump tweets");
            stream.on('data', function (data) {
                if (data.user.screen_name=="realDonaldTrump")
                {
                    console.log("Trump Tweeted");
                    console.log(data.user.screen_name + " :: " + data.text);
                    
                    //raspi.led.toggle;
                    LED.writeSync(1); // turn light on
                    setTimeout(function () {LED.writeSync(0);}, 2000);
                }
                
            });
        });
    }
}).start();

