import { writable } from 'svelte/store';


// API/PROFILE STUFF
export let accounts = writable([]);


// FLAGS AND STATE TRACKING
export let loggedIn = writable(false);

// NOT SURE IF THIS EVEN NEEDS TO EXIST BUT THERE MIGHT BE OTHER THINGS LATER
const baseURL = 'https://localhost:3000/api';


// GLOBAL FUNCTIONS
export const apiCall = async function (apiPath) {
  const response = await fetch(
    `${baseURL}${apiPath}`);
  console.log('Response to API Call in stores.js');
  console.log(response);
  const json = await response.json();
  console.log('After doing response.json()');
  console.log(json);
  const data = await json.Response;
  console.log('Data to be sent:');
  console.log(data);
  return data;
}