<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(
      `${params.membershipType}/${params.destinyMembershipId}`
    );

    //TODO: On server side, refactor data and just send the good stuff.
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
  import CharacterSelect from "../../components/CharacterSelect.svelte";
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
  <title>D2AO: {displayName}</title>
</svelte:head>

{#each characterArray as characterData (characterData.characterId)}
  <!-- content here -->
  <CharacterSelect {characterData} {displayName} />
{/each}
