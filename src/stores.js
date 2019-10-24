import { writable } from 'svelte/store';
import API_KEY from '../API_KEY.js';

export let currentMembershipId = writable(0);

export const platformPath = 'https://www.bungie.net/Platform';


export const apiCall = async function (apiPath) {
  const response = await fetch(
    `${platformPath}${apiPath}`,
    {
      headers: {
        "X-API-KEY": API_KEY
      }
    }
  );
  return response;
}