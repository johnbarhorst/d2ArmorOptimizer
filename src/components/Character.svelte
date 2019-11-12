<script>
  export let characterData;
  export let displayName;
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
