<script>
  import { characterHashArray, apiCall } from "../stores.js";
  const characters = apiCall();
  const getCharInfo = async function($characterHashArray) {};
</script>

<style>

</style>

{#await getCharInfo}
  <!-- promise is pending -->
{:then value}
  <!-- promise was fulfilled -->
{/await}
