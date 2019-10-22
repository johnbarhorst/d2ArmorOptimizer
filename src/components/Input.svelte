<script>
  let value;
  const log = function() {
    console.log(value);
  };
</script>

<style lang="scss">

</style>

<input bind:value on:keyup={() => log()} type="text" name="" id="" />
