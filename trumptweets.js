var Twitter = require('twitter');
const dotenv = require('dotenv');

dotenv.config();
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,//'dGjTxnK3WKpN3WEnKU5Mzp9Q8',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,// '1jRMHkJrdtV98bRyyH5lt0UF63qXMOIIAl4nDw9HBIaXhU2qOX',
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, // '50101843-RHkqnVlTRdEm2yOFeQXiypkMWF7ShGpxvUqCpiLQh',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET//'ZLugJtIovEyJzPuBgcLjSz2vfnFOfloB3D8oxuh4Vs0rr'
});
/* client.stream('statuses/filter', { follow: 'tammi_jo_'}, function (stream) {
    console.log("client stream created");
    stream.on('data', function (data) {
        //console.log(data.user.screen_name+ ': "'+ data.text+ '"');
        console.log("made it to stream.on");
        console.log(data.id);
        console.log(data.text);
        //my.led.toggle;
          //edison.monkey.digitalWrite(1);
          //setTimeout(function () {edison.monkey.digitalWrite(0);}, 2000);
    });
}); */
var params = {screen_name: 'realDonaldTrump'};
//client.stream('friends/list', {screen_name: 'tammi_jo_'}, function (stream) {
  client.stream('statuses/filter', { follow: '50101843'}, function (stream) {
  stream.on('data', function (data) {
    console.log(data.users);
    console.log(data.user.screen_name + " just tweeted "  + data.text);
  });
});

/* client.stream('statuses/filter', { track: '@realDonaldTrump'}, function (stream) {
    //console.log("client stream created");
    stream.on('data', function (data) {
        console.log(data.user.screen_name+ ': "'+ data.text+ '"');
        //console.log(data.text);
    });
});
 */
