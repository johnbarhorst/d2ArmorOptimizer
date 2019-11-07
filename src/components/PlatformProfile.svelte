<script>
  import {
    apiCall,
    currentMembershipId,
    characterHashArray,
    accountSelected
  } from "../stores.js";
  import { fly } from "svelte/transition";

  export let displayName;
  export let iconPath;
  export let membershipId;
  export let membershipType;

  const getProfile = async function() {
    const profiles = await apiCall(
      `/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`
    );
    const hashArray = Object.keys(profiles.characters.data);
    characterHashArray.set([...hashArray]);
  };

  const setMembershipId = function() {
    currentMembershipId.set(membershipId);
    getProfile();
    accountSelected.set(true);
  };

  const generateAltText = function(iconPath) {
    const firstIndex = iconPath.search("_");
    return iconPath.slice(firstIndex + 1, -4);
  };
</script>

<style>
  button {
    display: flex;
    align-items: center;
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
  img,
  p {
    margin-left: 5px;
  }
</style>

<button on:click={setMembershipId} transition:fly={{ y: -100 }}>
  <img
    src={`http://bungie.net${iconPath}`}
    alt={`${generateAltText(iconPath)} logo`} />
  <p>{displayName}</p>
</button>
