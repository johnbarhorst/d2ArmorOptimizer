
export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].svelte
  const stuff = await get(
    `http://localhost:3001/api/Profile/${req.query.membershipType}/${req.params.slug}`
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