<script>
  import { createEventDispatcher } from "svelte";
  import { apiCall } from "../stores.js";
  export let account;

  const dispatch = createEventDispatcher();
  const { displayName, iconPath, membershipId, membershipType } = account;

  const handleClick = async function() {
    const data = await apiCall(`/${membershipType}/${membershipId}`);
    dispatch("getCharacters", {
      characters: Object.values(data.characters.data)
    });
  };

  const generateAltText = function(iconPath) {
    const firstIndex = iconPath.search("_");
    return iconPath.slice(firstIndex + 1, -4);
  };
</script>

<style>
  button {
    display: flex;
    border: 1px solid #333;
    border-radius: 5px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  img {
    background: #333;
    max-width: 30px;
    max-height: 30px;
    border-radius: 100%;
  }
</style>

<button on:click={() => handleClick()}>
  <img
    src={`https://bungie.net${iconPath}`}
    alt={`${generateAltText(iconPath)} logo`} />
  <p>{displayName}</p>
</button>
