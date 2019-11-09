import API_KEY from "../../API_KEY.js";
export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].svelte
  const stuff = await get(
    `https://www.bungie.net/Platform/Destiny2/1/Profile/${req.params.slug}/?components=200`,
    {
      headers: {
        "X-API-KEY": API_KEY
      }
    }
  );
  // const json = await res.json();
  // const data = Object.values(json.Response.characters.data);

  if (stuff !== null) {
    res.setHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(stuff));
    res.end(JSON.stringify(stuff));
  } else {
    next();
  }
}