import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    player: {
      name: "Player",
      selectedPokemons: [],
      sprite: "/trainers/sprites/BattleBack/player.png",
    },
  },
  getters: {
    getSelectedPokemons: (state) => state.player.selectedPokemons,
    isSelectedPokemon: (state) => (pokemonId) => {
      return state.player.selectedPokemons.find((pk) => pk.id === pokemonId);
    },
  },
  mutations: {
    addSelectedPokemon(state, pokemon) {
      if (state.player.selectedPokemons.length >= 3) {
        state.player.selectedPokemons.shift();
      }
      pokemon.hp = 100;
      pokemon.currentHp = 100;
      state.player.selectedPokemons.push(pokemon);
    },
    removeSelectedPokemon(state, pokemon) {
      state.player.selectedPokemons = state.player.selectedPokemons.filter(
        (pk) => pk.id !== pokemon.id
      );
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
