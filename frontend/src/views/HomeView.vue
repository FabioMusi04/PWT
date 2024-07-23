<template>
  <div class="home-view">
    <h1>Welcome to the PWT Game</h1>
    <p>
      The PWT (Pokemon World Tournament) is a tournament game in Pokemon Black 2
      It features battles against various trainers from different regions.
    </p>
    <button @click="redirectToGame">Play</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToGame() {
      // Add your redirection logic here
      // For example, you can use Vue Router to navigate to the game page
      this.$router.push("/pokemonChoice");
    },
  },
};
</script>

<style scoped>
.home-view {
  text-align: center;
  margin-top: 50px;
}
</style>
