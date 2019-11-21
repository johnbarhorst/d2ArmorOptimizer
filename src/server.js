import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
const rp = require('request-promise-native');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const app = express();
const { PORT, NODE_ENV, API_KEY, client_secret, client_id } = process.env;
const dev = NODE_ENV === 'development';

const serverListenTime = function () {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return time;
}

const credentials = {
  client: {
    id: client_id,
    secret: client_secret
  },
  auth: {
    tokenHost: 'https://www.bungie.net/platform/app'
  }
};


// Handle individual character request
app.get('/api/Profile/:membershipType/:destinyMembershipId/:characterId', async (req, res, next) => {
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.destinyMembershipId}/Character/${req.params.characterId}/?components=201`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  res.send(data);
});


// Handle Character List Request
app.get('/api/Profile/:membershipType/:destinyMembershipId', async (req, res, next) => {
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.destinyMembershipId}/?components=200,100`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  res.send(data);
});

// Handle Search Request
app.get('/api/Search/:search', async (req, res, next) => {
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


// Appears that this needs to be at the bottom of the file, else disaster.
app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
);

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(PORT, err => {
  console.log(`Listening on port ${PORT} at ${serverListenTime()}`);
  if (err) console.log('error', err);
});


