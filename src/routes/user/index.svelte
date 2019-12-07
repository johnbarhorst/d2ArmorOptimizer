<script>
  import { stores } from "@sapper/app";
  import { apiCall } from "../../stores.js";
  import UserProfile from "../../components/UserProfile.svelte";
  import CharacterSelect from "../../components/CharacterSelect.svelte";

  const { preloading, page, session } = stores();

  let characters = [];

  const getCharacters = function(e) {
    characters = e.detail.characters;
  };

  const getCurrentUser = async function() {
    const response = await fetch(`/api/User/getUser.json`);
    const data = await response.json();
    console.log("Data in user route index");
    console.log(data);
    return data;
  };

  const profile = getCurrentUser();
</script>

<style>

</style>

<h1>User Page</h1>

{#if $session.user}
  {#await profile}
    <h2>Loading</h2>
  {:then profile}
    <h2>{profile.username}</h2>
    {#each profile.platforms as account (account.membershipId)}
      <UserProfile {account} on:getCharacters={getCharacters} />
    {/each}
  {:catch error}
    <h2>Error</h2>
  {/await}
{:else}
  <!-- TODO: Cmon, you can do better than this! -->
  <h1>
    You'll have to
    <a href="../api/auth/login">log in!</a>
  </h1>
{/if}
<div>
  {#if characters.length > 0}
    {#each characters as character (character.characterId)}
      <CharacterSelect characterData={character} />
    {/each}
  {/if}
</div>
