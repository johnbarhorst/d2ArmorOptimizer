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
    console.log(accounts.Response);
    accountList = [...accounts.Response];
  };

  const selectPlatform = function(profile) {};
</script>

<style>

</style>

{#if accountList.length > 0}
  {#each accountList as account}
    <PlatformProfile
      displayName={account.displayName}
      iconPath={account.iconPath} />
  {/each}
{:else}
  <h2>Search for a profile:</h2>
{/if}

<input bind:value={searchValue} type="text" />
<button on:click={() => getData(searchValue)}>Click</button>
