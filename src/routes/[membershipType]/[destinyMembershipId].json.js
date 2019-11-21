
export async function get(req, res, next) {
  const stuff = await get(
    `https://localhost:3000/api/Profile/${req.params.membershipType}/${req.params.destinyMembershipId}`
  );
  // const json = await res.json();
  // const data = Object.values(json.Response.characters.data);

  if (stuff !== null) {
    console.log('This is actually getting hit');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(stuff));
  } else {
    next();
  }
}