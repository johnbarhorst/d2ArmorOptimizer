<script>
  import { onMount } from "svelte";
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

{#await profile}
  <h2>Loading</h2>
{:then profile}
  <h2>{profile.username}</h2>
{:catch error}
  <h2>Error</h2>
{/await}
