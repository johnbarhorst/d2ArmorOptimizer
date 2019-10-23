import API_KEY from '../API_KEY.js';

export const platformPath = 'https://www.bungie.net/Platform';

export const apiCall = async function (basePath, apiPath) {
  const response = await fetch(
    `${basePath}${apiPath}/`,
    {
      headers: {
        "X-API-KEY": API_KEY
      }
    }
  );
  return response;
}