const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const SpotifyWebApi = require('spotify-web-api-node');
//const User = require('./models/user');

require('dotenv').config();
const dbLocal = "mongodb+srv://AdvSpotSearchDev:Password123@advspotsearchdb.5vbrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbLocal, {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
});

mongoose.connection.on('error', err => {console.log(err);});
//mongoose.set('useUnifiedTopology', true);

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


var spotifyApi = new SpotifyWebApi({
  clientId: 'd677f29341d8486f90c37f08fe86a25e'
});

// ----------------------------------------------------------------
// Mongoose Model
var userSchema = new mongoose.Schema({
  userId: String,
  createdPlaylist: [{
      playlistId: String
  }],
  likedTracks: [{
      trackId: String
  }]

});

const User = mongoose.model("User", userSchema);



// Refresh db, don't do this in production
User.remove({}, (err) => {
  if (err) {
      console.log(err);
  } else {
      console.log("removed users!");
  }
})


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});
var token;
var currUser;
app.post('/init', (req, res) => {
  token = req.body.token;
  spotifyApi.setAccessToken(token);
  currUser = req.body.userId;
  console.log("User is: " + currUser);
  User.findOne({userId: currUser}, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      spotifyApi.getMe().then((me) => {
        console.log(me.body);
      })
    }
  })
//  res.redirect()
})


app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;



