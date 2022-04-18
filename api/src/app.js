const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

require('dotenv').config();
/*const dbLocal = "mongodb://localhost:27017/adv_spotify_search";
mongoose.connect(dbLocal, {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
});

mongoose.connection.on('error', err => {console.log(err);});*/
//mongoose.set('useUnifiedTopology', true);

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});
var token;
var currUser;
app.post('/init', (req, res) => {
  token = req.body.token;
  currUser = req.body.userId;
  console.log("User is: " + currUser);
//  res.redirect()
})

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;



