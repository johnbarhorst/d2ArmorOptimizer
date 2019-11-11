<script>
  export let characterData;
  export let displayName;
  const {
    membershipId,
    characterId,
    emblemBackgroundPath,
    light,
    levelProgression,
    stats
  } = characterData;
</script>

<style>

</style>

<div>
  <p>{displayName}</p>
  <p>Light: {light}</p>
  <p>Level: {levelProgression.level}</p>
</div>
