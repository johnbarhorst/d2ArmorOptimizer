<script>
  import { fly } from "svelte/transition";

  export let account;
  console.log(account);
  const { displayName, iconPath, membershipId, membershipType } = account;

  const generateAltText = function(iconPath) {
    const firstIndex = iconPath.search("_");
    return iconPath.slice(firstIndex + 1, -4);
  };
</script>

<style>
  button {
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
  a {
    display: flex;
    text-decoration: none;
    color: #333;
  }
</style>

<button transition:fly={{ y: 200 }}>
  <a href={`./${membershipType}/${membershipId}`}>
    <img
      src={`https://bungie.net${iconPath}`}
      alt={`${generateAltText(iconPath)} logo`} />
    <p>{displayName}</p>
  </a>
</button>
