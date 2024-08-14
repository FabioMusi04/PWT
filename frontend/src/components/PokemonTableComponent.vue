<template>
  <div class="container-fluid">
    <div class="row">
      <PokemonViewComponent
        v-show="pokemonModal"
        :pokemon="selectedPokemon"
        @close="closeModal"
      />
      <!-- Pokémon List -->
      <div class="col-lg-6">
        <h2>Pokémon List</h2>
        <div class="form-group mb-4">
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
            placeholder="Search your Pokémon..."
            v-model="search"
            @input="searchPokemon"
          />
        </div>
        <div class="tablerounededCorner mb-2">
          <table class="table table-sm table-bordered roundedTable">
            <tbody>
              <tr
                v-for="(row, rowIndex) in chunkedPokemonData"
                :key="rowIndex"
                style="text-align: center; vertical-align: middle"
              >
                <td
                  v-for="pokemon in row"
                  :key="pokemon.id"
                  :class="{
                    highlighted: $store.getters.isSelectedPokemon(pokemon.id),
                  }"
                  @click="toggleHighlight(pokemon)"
                  :style="{
                    textAlign: 'center',
                    background: `transparent url(${backEndUrl}${pokemon.sprites.front}) center no-repeat`,
                    backgroundSize: 'contain',
                    width: 'auto',
                    height: '75px',
                    cursor: 'pointer',
                  }"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Selected Pokémon Team -->
      <div class="col-lg-6">
        <h2>Selected Pokémon Team</h2>
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pokemon in $store.state.player.selectedPokemons"
              :key="pokemon.id"
              style="text-align: center; vertical-align: middle"
            >
              <td
                :style="{
                  textAlign: 'center',
                  background: `white url(${backEndUrl}${pokemon.sprites.front}) center no-repeat`,
                  backgroundSize: 'contain',
                  width: 'auto',
                  height: '75px',
                  cursor: 'pointer',
                }"
              ></td>
              <td>{{ pokemon.name }}</td>
              <td>
                <i
                  class="bi bi-search btn btn-info me-2"
                  @click="showModal(pokemon)"
                />

                <i
                  class="bi bi-trash btn btn-danger"
                  @click="$store.commit('removeSelectedPokemon', pokemon)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="row pb-3 mt-3">
      <div class="col-lg-12 d-flex justify-content-center">
        <button
          class="btn btn-warning"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          Previous
        </button>
        <span class="align-self-center mx-2">{{ currentPage }}</span>
        <button
          class="btn btn-warning"
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
import PokemonViewComponent from "./PokemonViewComponent.vue";
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      pokemonData: [],
      selectedGeneration: -1,
      currentPage: 1,
      itemsPerPage: 0,
      skip: 0,
      totalPages: 0,
      search: "",
      limit: 36,
      backEndUrl: process.env.VUE_APP_BACKEND_URL || "http://localhost:3000",
      pokemonModal: null,
      selectedPokemon: null,
    };
  },
  components: {
    PokemonViewComponent,
  },
  computed: {
    selectedPokemons() {
      return this.getSelectedPokemons;
    },
    generations() {
      return [1, 2, 3, 4, 5, 6, 7, 8];
    },
    chunkedPokemonData() {
      const chunkSize = 6;
      const chunks = [];
      for (let i = 0; i < this.pokemonData.length; i += chunkSize) {
        chunks.push(this.pokemonData.slice(i, i + chunkSize));
      }
      return chunks;
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
      if (this.$store.getters.isSelectedPokemon(pokemon.id)) {
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
    showModal(pokemon) {
      this.selectedPokemon = pokemon;

      this.pokemonModal = Modal.getOrCreateInstance("#pokemonModal", {
        keyboard: false,
      });
      this.pokemonModal.show();
    },
    closeModal() {
      this.pokemonModal.hide();
      this.selectedPokemon = null;
    },
  },
  mounted() {
    this.fetchPokemonData();
  },
};
</script>

<style>
.highlighted {
  background-color: yellow !important;
}
.tablerounededCorner {
  border: 2.5px solid #ffffff;
  border-radius: 1em;
}

.roundedTable {
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  width: 100%;
  margin: 0;
}
</style>
