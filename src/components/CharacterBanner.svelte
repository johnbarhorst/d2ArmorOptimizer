<script>
  import Character from "./Character.svelte";
  export let characterData;
  const {
    membershipId,
    characterId,
    emblemBackgroundPath,
    light,
    levelProgression,
    stats,
    classType,
    genderType,
    raceType
  } = characterData;

  // This data is available via hash from the database, but no need to process that on the server just yet.
  const classTypeRef = ["Titan", "Hunter", "Warlock"];
  const genderTypeRef = ["Male", "Female"];
  const raceTypeRef = ["Human", "Awoken", "Exo"];
</script>

<style>
  div {
    color: #fff;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>

<div
  style="background-image: url({`https://www.bungie.net${emblemBackgroundPath}`})">
  <h3>{classTypeRef[classType]}</h3>
  <p>{light}</p>
  <p>{raceTypeRef[raceType]} {genderTypeRef[genderType]}</p>
</div>
<div>
  <Character account={characterData} />
</div>
