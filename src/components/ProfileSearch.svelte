<script>
  import { platformPath, apiCall } from "../stores.js";
  import PlatformProfile from "./PlatformProfile.svelte";

  let searchValue = "";
  let accountList = [];

  const getData = async function(search) {
    const response = await apiCall(
      platformPath,
      `/Destiny2/SearchDestinyPlayer/All/${search}/`
    );
    const accounts = await response.json();
    console.log(`accounts array`);
    console.log(accounts.Response);
    accountList = [...accounts.Response];
  };

  const selectPlatform = function(profile) {};
</script>

<style>
  .account-display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  input[type="text"] {
    font-size: 20px;
    height: 25px;
  }
</style>

<section class="account-display">
  {#if accountList.length > 0}
    {#each accountList as account (account.membershipId)}
      <PlatformProfile
        displayName={account.displayName}
        iconPath={account.iconPath}
        membershipId={account.membershipId} />
    {/each}
  {:else}
    <h2>Search for a profile:</h2>
  {/if}
</section>

<input bind:value={searchValue} type="text" />
<button on:click={() => getData(searchValue)}>Search</button>
