const rp = require('request-promise-native');
require('dotenv').config();
const { API_KEY } = process.env;

export async function get(req, res, next) {
  console.log(req.params.search);
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${req.params.search}/`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  res.send(data);
}