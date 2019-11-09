<script>
  import { apiCall } from "../stores.js";
  const getManifest = async function() {
    const manifest = await apiCall("/Destiny2/Manifest/");
    console.log(manifest);
  };
</script>

<style>

</style>

<button on:click={getManifest}>Get Manifest</button>
