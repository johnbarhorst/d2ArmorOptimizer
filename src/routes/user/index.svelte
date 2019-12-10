<script>
  import { stores } from "@sapper/app";

  import CharacterBanner from "../../components/CharacterBanner.svelte";
  import AccountButton from "../../components/AccountButton.svelte";

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
  .account-display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 15px;
  }
</style>

<h1>User Page</h1>

{#if $session.user}
  {#await profile}
    <h2>Loading</h2>
  {:then profile}
    <h2>{profile.username}</h2>
    <section class="account-display">
      {#each profile.platforms as account (account.membershipId)}
        <AccountButton {account} on:getCharacters={getCharacters} />
      {/each}
    </section>
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
      <CharacterBanner characterData={character} />
    {/each}
  {/if}
</div>
