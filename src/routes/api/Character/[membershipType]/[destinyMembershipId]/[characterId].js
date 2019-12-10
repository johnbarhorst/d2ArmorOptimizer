const rp = require('request-promise-native');
require('dotenv').config();
const { API_KEY } = process.env;

//Get Character stuffs:
const fetchCharacterData = async function (req) {
  const { membershipType, destinyMembershipId, characterId } = req.params;
  const data = await rp({
    url: `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/?components=201,202,204,205`,
    headers: {
      "X-API-KEY": API_KEY
    }
  }, (err, res, body) => {
    if (err) { return console.log(err); }
  });
  return data;
}

export async function get(req, res, next) {
  const characterData = await fetchCharacterData(req);
  res.send(characterData);
}