<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Pokémon List -->
      <div class="col-lg-6">
        <h2>Pokémon List</h2>
        <div class="form-group mb-5">
          <label for="generation">Generation:</label>
          <select
            id="generation"
            class="form-control mb-4"
            v-model="selectedGeneration"
            @change="fetchPokemonData"
          >
            <option value="-1">All</option>
            <option
              v-for="generation in generations"
              :key="generation"
              :value="generation"
            >
              {{ generation }}
            </option>
          </select>

          <!-- searchbox -->
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="search"
            @input="searchPokemon"
          />
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Generation</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pokemon in pokemonData"
              :key="pokemon.id"
              :class="{
                highlighted: $store.getters.isSelectedPokemon(pokemon),
              }"
              @click="toggleHighlight(pokemon)"
            >
              <td>
                <img
                  :src="`${backEndUrl}${pokemon.sprites.front}`"
                  :alt="pokemon.name"
                  class="img-fluid"
                />
              </td>
              <td>{{ pokemon.name }}</td>
              <td>{{ pokemon.generation }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Selected Pokémon Team -->
      <div class="col-lg-6">
        <h2>Selected Pokémon Team</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pokemon in $store.state.selectedPokemons"
              :key="pokemon.id"
            >
              <td>
                <img
                  :src="`${backEndUrl}${pokemon.sprites.front}`"
                  :alt="pokemon.name"
                  class="img-fluid"
                />
              </td>
              <td>{{ pokemon.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="row mt-3">
      <div class="col-lg-12 d-flex justify-content-center">
        <button
          class="btn btn-primary"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          Previous
        </button>
        <span class="align-self-center">{{ currentPage }}</span>
        <button
          class="btn btn-primary"
          :disabled="pokemonData.length === 0"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios/axios.js";

export default {
  data() {
    return {
      pokemonData: [],
      selectedGeneration: null,
      currentPage: 1,
      itemsPerPage: 10,
      skip: 0,
      totalPages: 0,
      search: "",
      limit: 10,
      backEndUrl: process.env.VUE_APP_BACKEND_URL || "http://localhost:3000",
    };
  },
  computed: {
    selectedPokemons() {
      return this.getSelectedPokemons;
    },
    generations() {
      return [1, 2, 3, 4, 5, 6, 7, 8];
    },
  },
  methods: {
    fetchPokemonData() {
      let queryParams = [];
      if (this.skip !== null) queryParams.push(`skip=${this.skip}`);

      if (this.limit !== null) queryParams.push(`limit=${this.limit}`);

      if (
        this.selectedGeneration !== null &&
        parseInt(this.selectedGeneration) !== -1
      )
        queryParams.push(`generation=${this.selectedGeneration}`);

      if (this.search !== null && this.search !== "")
        queryParams.push(`search=${this.search}`);

      queryParams.push("count=true");

      const queryString = queryParams.join("&");

      axios
        .get(`/pokemons/?${queryString}`)
        .then((response) => {
          this.pokemonData = response.data.pokemons;
          this.itemsPerPage = response.data.count;
          this.skip = this.itemsPerPage * (this.currentPage - 1);
          this.totalPages = Math.ceil(response.data.count / this.itemsPerPage);
        })
        .catch((error) => {
          console.error("Error fetching Pokemon data:", error);
          alert("Failed to fetch Pokemon data. Please try again later.");
        });
    },

    toggleHighlight(pokemon) {
      if (this.$store.getters.isSelectedPokemon(pokemon)) {
        this.$store.commit("removeSelectedPokemon", pokemon);
      } else {
        this.$store.commit("addSelectedPokemon", pokemon);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.skip = this.itemsPerPage * (this.currentPage - 1);
        this.fetchPokemonData();
      }
    },
    nextPage() {
      if (this.pokemonData.length > 0) {
        this.currentPage++;
        this.skip = this.itemsPerPage * (this.currentPage - 1);
        this.fetchPokemonData();
      }
    },
    searchPokemon() {
      this.fetchPokemonData();
    },
  },
  mounted() {
    this.fetchPokemonData();
  },
};
</script>

<style>
.highlighted > td {
  background-color: yellow;
}
</style>
