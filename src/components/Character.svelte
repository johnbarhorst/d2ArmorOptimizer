<script>
  import { apiCall } from "../stores.js";
  export let account;
  const getCharacterData = async function(account) {
    const { membershipType, membershipId, characterId } = account;
    const data = await apiCall(
      `/Character/${membershipType}/${membershipId}/${characterId}`
    );
    console.log(data);
  };
</script>

<style>

</style>

<button on:click={() => getCharacterData(account)}>Character Data Go!</button>
