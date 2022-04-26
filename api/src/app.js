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
const { count } = require('console');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


var spotifyApi = new SpotifyWebApi({
  clientId: 'd677f29341d8486f90c37f08fe86a25e',
  clientSecret: 'a427a0942d3441b292f2df3e74555c34'
});

// ----------------------------------------------------------------
// Mongoose Model
var userSchema = new mongoose.Schema({
  userId: String,
  createdPlaylist: [{
      playlistId: String,
      playlistUrl: String
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
  currUserId = req.body.userId;
  //console.log("User is: " + currUser);
  //console.log(req.body.playlists)
  currUser = User.findOne({userId: currUserId});
  /*if (currUser.userId) {
    for(let i = 0; i < currUser.playlists.length; i++) {
      var found = false;
      for(let j = 0; j < req.body.playlists.length; j++) {
        if(req.body.playlists[j].id == currUser.playlists[i].playlistId) {
          found = true;
        }
        if(!found) {
          currUser.playlists.pop(i, 1)
        }
      }
    }
  }*/
  console.log("Current user is: " + currentUser);

//  res.redirect()
})

app.post('/addPlaylist', (req, res) => {
  console.log("Called addPlaylist")
  currUser.playlists.push([req.body.playlistId, req.body.playlistLink])
  console.log(currUser)
})


app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;



