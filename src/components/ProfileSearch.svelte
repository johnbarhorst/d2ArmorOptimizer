<script>
  import { apiCall, accounts } from "../stores.js";
  import AccountSelector from "./AccountSelector.svelte";

  let value = "";
  let searchResults = [];
  $: accounts.set(searchResults);

  const searchForAccounts = async function(search) {
    const accountList = await apiCall(`/Search/${search}`);
    searchResults = [...accountList];
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
<form on:submit|preventDefault={() => searchForAccounts(value)}>
  <input bind:value type="text" />
  <button type="submit">Search</button>
</form>

<section class="account-display">
  {#if $accounts.length > 0}
    {#each $accounts as account (account.membershipId)}
      <AccountSelector {account} />
    {/each}
  {/if}
</section>
