import { writable } from 'svelte/store';


// API/PROFILE STUFF
export let currentMembershipId = writable(0);
export let currentDisplayName = writable('');
export let membershipType = writable('All');
export let accounts = writable([]);



// FLAGS AND STATE TRACKING
export let accountNameSearched = writable(false);
export let accountSelected = writable(false);

// NOT SURE IF THIS EVEN NEEDS TO EXIST BUT THERE MIGHT BE OTHER THINGS LATER
export const baseURL = 'http://localhost:3000/api';


// GLOBAL FUNCTIONS
export const apiCall = async function (apiPath) {
  const response = await fetch(
    `${baseURL}${apiPath}`);
  console.log(response);
  const json = await response.json();
  const data = await json.Response;
  return data;
}