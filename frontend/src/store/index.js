import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    selectedPokemons: [],
  },
  getters: {
    getSelectedPokemons: (state) => state.selectedPokemons,
    isSelectedPokemon: (state) => (pokemonId) => {
      return state.selectedPokemons.find((pk) => pk.id === pokemonId);
    },
  },
  mutations: {
    addSelectedPokemon(state, pokemon) {
      if (state.selectedPokemons.length >= 3) {
        state.selectedPokemons.shift();
      }
      pokemon.hp = 100;
      pokemon.currentHp = 100;
      state.selectedPokemons.push(pokemon);
    },
    removeSelectedPokemon(state, pokemon) {
      state.selectedPokemons = state.selectedPokemons.filter(
        (pk) => pk.id !== pokemon.id
      );
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
