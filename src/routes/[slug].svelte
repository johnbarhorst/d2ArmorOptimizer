<script context="module">
  import API_KEY from "../../API_KEY.js";
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    console.log(params);
    const res = await this.fetch(
      `https://www.bungie.net/Platform/Destiny2/1/Profile/${params.slug}/?components=200`,
      {
        headers: {
          "X-API-KEY": API_KEY
        }
      }
    );

    const json = await res.json();
    const data = await Object.values(json.Response.characters.data);

    if (res.status === 200) {
      return { characterArray: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let characterArray;
  console.log(characterArray);
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
</style>

<svelte:head>
  <title>Test</title>
</svelte:head>

<h1>Test</h1>

{#each characterArray as character (character.characterId)}
  <!-- content here -->
  <h3>{character.characterId}</h3>
{/each}
