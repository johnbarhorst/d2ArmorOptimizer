import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
const rp = require('request-promise-native');
const https = require('https');
const passport = require('passport');
const Oauth2Strategy = require('passport-oauth2');
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cookieSession = require('cookie-session');
require('dotenv').config();

const app = express();
const { PORT, NODE_ENV, client_secret, client_id, API_KEY, Mongo_DB } = process.env;
const dev = NODE_ENV === 'development';

const getTime = function () {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return time;
}
// DB STUFF
// Connect to MongoDB
mongoose.connect(Mongo_DB, () => console.log('Connected to MongoDB'));

const platformSchema = new Schema({
  displayName: String,
  membershipType: Number,
  membershipId: Number,
  crossSaveOverride: Number,
  iconPath: String
})

const userSchema = new Schema({
  username: String,
  bungieId: Number,
  locale: String,
  platforms: [platformSchema]
});

const User = mongoose.model('user', userSchema);

// OAUTH GOODNESS

//cookies
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey],
}));

passport.use(new Oauth2Strategy({
  authorizationURL: 'https://www.bungie.net/en/oauth/authorize',
  tokenURL: 'https://www.bungie.net/platform/app/oauth/token/',
  clientID: client_id,
  clientSecret: client_secret,
  callBackURL: 'https://localhost:3000/auth/redirect'
}, async (accessToken, refreshToken, profile, done) => {
  const data = await rp({
    url: `https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/`,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "X-API-KEY": API_KEY
    }
  }, err => err && console.log(err));
  const accountInfo = JSON.parse(data).Response;
  const destinyProfile = accountInfo.destinyMemberships;
  const bungieProfile = accountInfo.bungieNetUser;
  console.log(bungieProfile);
  console.log(destinyProfile);
  User.findOne({ bungieId: bungieProfile.membershipId })
    .then(currentUser => {
      if (currentUser) {
        console.log(currentUser);
        done(null, currentUser);
      } else {
        new User({
          username: bungieProfile.displayName,
          bungieId: bungieProfile.membershipId,
          locale: bungieProfile.locale,
          platforms: destinyProfile.map(profile => {
            return {
              displayName: profile.displayName,
              membershipType: profile.membershipType,
              membershipId: profile.membershipId,
              crossSaveOverride: profile.crossSaveOverride,
              iconPath: profile.iconPath
            }
          })
        }).save().then(newUser => {
          console.log(newUser);
          done(null, newUser);
        });
      }
    });
}));

app.get('/auth/login', passport.authenticate('oauth2'));

app.get('/auth/redirect', passport.authenticate('oauth2'), (req, res) => {
  console.log('Logged in');
  res.send(req.user);
});

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

// This needs to be at the bottom of the file, else disaster.
app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
);

// All systems go:
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(PORT, err => {
  console.log(`Listening on port ${PORT} at ${getTime()}`);
  if (err) console.log('error', err);
});


