import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
const rp = require('request-promise-native');
require('dotenv').config();

const app = express();
const { PORT, NODE_ENV, API_KEY } = process.env;
const dev = NODE_ENV === 'development';


// Handle individual character request
app.get('/api/Profile/:membershipType/:destinyMembershipId/:characterId', async (req, res, next) => {
  console.log('Character Request');
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.destinyMembershipId}/Character/${req.params.characterId}/?components=201`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  console.log(JSON.parse(data).Response);
  res.send(data);
});


// Handle Character List Request
app.get('/api/Profile/:membershipType/:destinyMembershipId', async (req, res, next) => {
  console.log('Character List Request');
  console.log(req.params);
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.destinyMembershipId}/?components=200,100`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  console.log(JSON.parse(data).Response);
  res.send(data);
});

// Handle Search Request
app.get('/api/search/:search', async (req, res, next) => {
  console.log('Search Character');
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${req.params.search}/`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  res.send(data);
});

app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
)
  .listen(PORT, err => {
    console.log(`Listening on port ${PORT}`);
    if (err) console.log('error', err);
  });


