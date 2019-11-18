<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte

    const res = await this.fetch(
      `http://localhost:3001/api/Profile/${params.membershipType}/${params.destinyMembershipId}/${params.characterId}`
    );

    //TODO: On server side, refactor data and just send the good stuff.
    const json = await res.json();
    const data = await Object.values(json.Response);
    // const displayName = json.Response.profile.data.userInfo.displayName;

    if (res.status === 200) {
      return { data: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let data;
  console.log(data);
</script>

<style>

</style>

<h1>Character Sheet</h1>
