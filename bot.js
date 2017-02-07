var twitterAPI = require('node-twitter-api');
var util = require('util');
var fs = require('fs');

var consumerKey = "";
var consumerSecret = "";
var accessToken = "";
var tokenSecret = "";

var twitter = new twitterAPI({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret});

var urbanData = JSON.parse(fs.readFileSync("urbandict.json"));
var urban = urbanData["dictionary"];

var counter = parseInt(fs.readFileSync("counter.txt").toString());

twitter.statuses("update",
    {"status": urban[counter].word},
    accessToken,
    tokenSecret,
    function(error, data, response) {
        if (error) {
            console.log("something went wrong: " + util.inspect(error));
        }
    }
);

counter++;
fs.writeFileSync("counter.txt", counter.toString(), "utf8");