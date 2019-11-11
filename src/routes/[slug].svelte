<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte

    const res = await this.fetch(
      `http://localhost:3001/api/Profile/${query.membershipType}/${params.slug}`
    );

    const json = await res.json();
    const data = await Object.values(json.Response.characters.data);
    const displayName = json.Response.profile.data.userInfo.displayName;

    if (res.status === 200) {
      return { characterArray: data, displayName: displayName };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Character from "../components/Character.svelte";
  export let characterArray;
  export let displayName;
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
  <title>D2AO</title>
</svelte:head>

{#each characterArray as character (character.characterId)}
  <!-- content here -->
  <Character characterData={character} {displayName} />
{/each}
