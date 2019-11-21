## Destiny 2 Armor Optimizer

A tool for comparing armor pieces and optimizing stats for Destiny 2.


### If you want to run it on your machine, you'll need a few things...
  First, you'll have to get your own API key by registering at [Bungie](https://www.bungie.net/en/Application), here you will also need to set your redirect url to https://localhost:3000/auth/redirect.

  Create a .env file in the root directory of your project, and copy the following into it:

```
  API_KEY='your x-api-key from bungie goes here'
  client_secret='your client secret from bungie'
  client_id='your client id from bungie'
```

  You'll also need to set up localhost with your own https certificates. I used the steps detailed [here](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/).



Built with Svelte/Sapper and Node/Express. 