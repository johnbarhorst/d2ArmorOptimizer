<script>
  import { fly } from "svelte/transition";

  export let displayName;
  export let iconPath;
  export let membershipId;
  export let membershipType;
  export let isPublic;
  export let crossSaveOverride;

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

<button transition:fly={{ y: 200 }}>
  <img
    src={`http://bungie.net${iconPath}`}
    alt={`${generateAltText(iconPath)} logo`} />
  <p>{displayName}</p>
</button>
