<script>
  import { apiCall, membershipType, currentMembershipId } from "../stores.js";

  let characterArray = [];
  $: console.log("characters updated", characters);

  const getCharacterList = async function() {
    // Set the membership ID to be the one associated with account clicked
    currentMembershipId.set(membershipId);
    // Returns the characters for that membershipID
    const characterList = await apiCall(
      `/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`
    );
    console.log(profiles);
    characterArray = Object.values(characterList.characters.data);
    // Flagging that an account has been set for now, until I have better data flow
    accountSelected.set(true);
  };
</script>

<style>

</style>
