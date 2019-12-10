<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(
      `/api/${params.membershipType}/${params.destinyMembershipId}`
    );

    //TODO: On server side, refactor data and just send the good stuff.

    const data = await res.json();
    console.log("data");
    console.log(data);
    if (res.status === 200) {
      return { data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import CharacterBanner from "../../components/CharacterBanner.svelte";
  export let data;
  console.log(data);
  const characterArray = Object.values(data.Response.characters.data);
  const displayName = data.Response.profile.data.userInfo.displayName;

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
  <CharacterBanner {characterData} {displayName} />
{/each}
