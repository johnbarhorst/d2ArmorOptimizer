<script>
  import {
    platformPath,
    apiCall,
    characterHashArray,
    accountSelected
  } from "../stores.js";
  import PlatformProfile from "./PlatformProfile.svelte";

  let searchValue = "";
  let accountList = [];

  $: console.log($characterHashArray);

  const getData = async function(search) {
    const accounts = await apiCall(
      `/Destiny2/SearchDestinyPlayer/All/${search}/`
    );
    accountList = [...accounts];
  };
</script>

<style>
  .account-display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 15px;
  }

  h2 {
    margin-bottom: 10px;
  }
  form {
    display: flex;
  }
  input[type="text"] {
    font-size: 20px;
    height: 25px;
    width: 200px;
    border: 1px solid #333;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  button {
    height: 29px;
    width: 150px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
</style>

<h2>Search for a profile:</h2>
<form on:submit|preventDefault={() => getData(searchValue)}>
  <input bind:value={searchValue} type="text" />
  <button type="submit">Search</button>
</form>

<section class="account-display">
  {#if accountList.length > 0}
    {#each accountList as account (account.membershipId)}
      <PlatformProfile {...account} />
    {/each}
    <!-- TODO: Logic for invalid searches -->
  {/if}
</section>
