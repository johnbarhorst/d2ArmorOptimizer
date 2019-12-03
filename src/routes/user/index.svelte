<script>
  import { onMount } from "svelte";
  const getUser = async function() {
    const response = await fetch(`/api/User/getUser.json`);
    const data = await response.json();
    console.log("Data in user route index");
    console.log(data);
  };

  onMount(() => {
    getUser();
  });
</script>

<style>

</style>

<h1>User Page</h1>
