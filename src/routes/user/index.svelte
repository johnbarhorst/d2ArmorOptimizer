<script>
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
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
  {:catch error}
    <h2>Error</h2>
  {/await}
{:else}
  <!-- TODO: Cmon, you can do better than this! -->
  <h1>You'll have to log in!</h1>
{/if}
