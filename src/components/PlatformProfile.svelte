<script>
  export let displayName;
  export let iconPath;

  const generateAltText = function(iconPath) {
    const firstIndex = iconPath.search("_");
    return iconPath.slice(firstIndex + 1, -4);
  };
</script>

<style>
  div {
    display: flex;
    align-items: center;
    border: 1px solid #333;
    margin: 5px 0;
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

<div>
  <img
    src={`http://bungie.net${iconPath}`}
    alt={`${generateAltText(iconPath)} logo`} />
  <p>{displayName}</p>
</div>
