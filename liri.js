// IMPORTING MODULES

var inquirer = require("inquirer");
var omdb = require("omdb");
var request = require("request");
var Twitter = require("twitter");
var keysObject = require("./keys.js");
var fs = require("fs");
var keys = keysObject.twitterKeys;
// ===================================

// console.log(keys);

var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

var params = {
    screen_name: 'KenjaevJurabek'
};


function getTwitter() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text)
            }
        }
    });
}

function getOMDB(input) {

    client.request('http://www.omdbapi.com/?apikey=40e9cece&t=' + input + '&r=json', function(error, response, body) {
        if (!error) {
            var results = JSON.parse(response.body)
            console.log("TITLE : " + results.Title);
            console.log("YEAR : " + results.Year);
            console.log("Rating : " + results.Ratings[0].Value);
            console.log("COUNTRY : " + results.Country);
            console.log("LANG : " + results.Language);
            console.log("PLOT : " + results.Plot);
            console.log("ACTORS: " + results.Actors);
            console.log("ROTTEN TOMATOS: " + results.Ratings[2].Value);
        }
    });

}


inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: ["my-tweets", "do -what - it - says", "movie-this"]
    }])
    .then(function(answers) {

        console.log(answers.choice)

        if (answers.choice === "my-tweets") {

            getTwitter();

        } else if (answers.choice === "do -what - it - says") {

            console.log("You picked do -what - it - says")

        } else if (answers.choice === "movie-this") {
            inquirer.prompt([{
                name: "movie",
                type: "input",
                message: "What movie would you like to see?"
            }]).then(function(user) {
                console.log(user.movie)
                getOMDB(user.movie);
            })
        }
    });
