var express = require('express'), //Ensure our express framework has been added
    app = express(),
    bodyParser = require('body-parser'),np //Ensure our body-parser tool has been added
    mongoose = require("mongoose"),
    passport = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    passportSpotify = require("passport-spotify")
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', function(req, res){
    //Landing Page
});

app.listen(3000, function () {
    console.log("Server listening on port 3000");
})