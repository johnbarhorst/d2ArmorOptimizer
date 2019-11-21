<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(
      `http://localhost:3000/api/Profile/${params.membershipType}/${params.destinyMembershipId}`
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
  import { stores } from "@sapper/app";
  import CharacterSelect from "../../components/CharacterSelect.svelte";
  export let characterArray;
  export let displayName;
  const { preloading } = stores();
  console.log(characterArray);
  $: console.log($preloading);
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

{#if $preloading}
  <h1>Loading Characters</h1>
{:else}
  {#each characterArray as characterData (characterData.characterId)}
    <!-- content here -->
    <CharacterSelect {characterData} {displayName} />
  {/each}
{/if}
