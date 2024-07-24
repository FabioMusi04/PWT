<template>
  <div>
    <h1>Select 3 Pokemons</h1>
    <pokemon-table />
    <div v-if="$store.state.selectedPokemons.length === 3" class="m-2">
      <router-link to="/tournament">Start Tournament</router-link>
    </div>
  </div>
</template>

<script>
import PokemonTable from "@/components/PokemonTableComponent.vue";

export default {
  data() {
    return {};
  },
  components: {
    PokemonTable,
  },
};
</script>

<style>
/* CSS styles for the page go here */
</style>
