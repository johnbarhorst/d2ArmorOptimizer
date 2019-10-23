<script>
  import { rootPath } from "../stores.js";
  import API_KEY from "../../API_KEY.js";
  import Input from "./Input.svelte";

  let searchValue;
  let haveProfiles = false;
  const profileList = [];

  const getData = async function(search) {
    const response = await fetch(
      `${rootPath}/Destiny2/SearchDestinyPlayer/All/${search}/`,
      {
        headers: {
          "X-API-KEY": API_KEY
        }
      }
    );
    const profiles = await response.json();
    console.log(profiles.Response);
    profileList.push(...profiles.Response);
    haveProfiles = true;
  };
</script>

<style>

</style>

{#if haveProfiles}
  {#each profileList as profile}
    <h4>
      <img src={`http://bungie.net${profile.iconPath}`} alt="Platform Logo" />
      {profile.displayName}
    </h4>
  {/each}
{:else}
  <h4>Search for a profile:</h4>
{/if}

<input bind:value={searchValue} type="text" />
<button on:click={() => getData(searchValue)}>Click</button>
