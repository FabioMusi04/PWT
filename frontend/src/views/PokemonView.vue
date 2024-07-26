<template>
  <div>
    <h1>Select 3 Pokemons</h1>
    <div v-if="$store.state.player.selectedPokemons.length === 3" class="m-3">
      <router-link class="link" to="/tournament">Start Tournament</router-link>
    </div>
    <pokemon-table />
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

<style scoped>
h1 {
  text-align: center;
}
.link {
  text-align: center;
  color: white;
  background-color: #f5000c;
  padding: 10px;
  border: 2px solid #ffffff;
  border-radius: 10px;
}
</style>
