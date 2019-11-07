import { writable } from 'svelte/store';
import API_KEY from '../API_KEY.js';


// API/PROFILE STUFF
export let currentMembershipId = writable(0);
export let membershipType = writable('All');
export let accounts = writable([]);



// FLAGS AND STATE TRACKING
export let accountNameSearched = writable(false);
export let accountSelected = writable(false);

// NOT SURE IF THIS EVEN NEEDS TO EXIST BUT THERE MIGHT BE OTHER THINGS LATER
export const platformPath = 'https://www.bungie.net/Platform';


// GLOBAL FUNCTIONS
export const apiCall = async function (apiPath) {
  const response = await fetch(
    `${platformPath}${apiPath}`,
    {
      headers: {
        "X-API-KEY": API_KEY
      }
    }
  );
  console.log(response);
  const json = await response.json();
  const data = await json.Response;
  return data;
}