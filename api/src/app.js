const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const SpotifyWebApi = require('spotify-web-api-node');
//const User = require('./models/user');
const Observer = require("./observer")
const Subject = require("./subject")
const subject = new Subject().getInstance();
subject.addObserver(new Observer());

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
/*User.remove({}, (err) => {
  if (err) {
      console.log(err);
  } else {
      console.log("removed users!");
  }
})*/

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

var token;
var currUserId = "";

async function getUser(currUser, playlists) {
  const user = await User.findOne({userId: currUser})
  if(!user) {
    subject.notifyObservers({
      evntName: "New User",
      value: currUser
  })
    //console.log("Creating New User")
    const newUser = await User.create({userId: currUser})
    return newUser
  } else {
    subject.notifyObservers({
      evntName: "Returning User",
      value: currUser
  })
    //console.log("Updating Playlists")
    user.createdPlaylist = user.createdPlaylist.filter(function(item) {
      for(let i = 0; i < playlists.length; i++) {
        if(playlists[i].id == item.playlistId) {return item}
      }
    })
    user.save()
  }
  return user
}

async function addToPlaylist(currUser, playlistId, playlistLink) {
  const user = await User.findOne({userId: currUser})
  if(user) {
    console.log("Adding To Playlist")
    user.createdPlaylist.push({playlistId: playlistId, playlistUrl: playlistLink})
    user.save()
    //console.log(user)
    subject.notifyObservers({
      evntName: "newPlaylist",
      value: playlistId
  })
  }
}

async function getPlaylist(currUser) {
  const user = await User.findOne({userId: currUser}).then(user => {
    //console.log(user.createdPlaylist)
    return user.createdPlaylist
  })
  //console.log("Getting playlists")
  //console.log(user.createdPlaylist)
  return user.createdPlaylist
}

app.post('/init', (req, res) => {
  token = req.body.token;
  spotifyApi.setAccessToken(token);
  currUserId = req.body.userId;
  getUser(currUserId, req.body.playlists).then((user) => {/*console.log(user)*/})
  //const playlists = getPlaylist(currUserId)
  res.send({"playlist": "Hello World"})

})

app.post('/addPlaylist', (req, res) => {
  console.log("Called addPlaylist")
  console.log(currUserId)
  addToPlaylist(currUserId, req.body.playlistId, req.body.playlistLink)
})

app.get("/getPlaylists", (req, res) =>{
  //while(currUserId = "") {
    console.log("This is called")
    console.log(currUserId)
    User.findOne({userId: currUserId}).then((user) =>{
      console.log(user.createdPlaylist)
      res.send(user.createdPlaylist)
    })
})

app.get('/observer', (req, res) => {
  let string = ["Hello", "World!"]
  res.send(string)
})

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;



