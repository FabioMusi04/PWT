<template>
  <div>
    <div
      class="modal fade"
      id="pokemonModal"
      tabindex="-1"
      aria-labelledby="pokemonModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="pokemonModalLabel">
              {{ pokemon?.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="pokemon-info">
              <h6>HP: {{ pokemon?.hp }}</h6>
              <ul class="list-group">
                <li class="list-group-item">
                  <strong>Height:</strong> {{ pokemon?.height }}
                </li>
                <li class="list-group-item">
                  <strong>Weight:</strong> {{ pokemon?.weight }}
                </li>
              </ul>

              <h6 class="mt-3">Types:</h6>
              <span
                :style="typesBgColor(type)"
                class="badge rounded-pill me-2"
                v-for="(type, index) in pokemon?.types"
                :key="index"
              >
                {{ type }}
              </span>

              <h6 class="mt-3">Moves:</h6>
              <ul class="list-group">
                <li
                  class="list-group-item"
                  v-for="(moveEntry, index) in pokemon?.moves"
                  :key="index"
                >
                  {{ moveEntry.move.name }}
                </li>
              </ul>

              <h6 class="mt-3">Sprites:</h6>
              <div class="sprites">
                <img
                  :src="`${backEndUrl}${pokemon?.sprites.front}`"
                  class="me-2"
                  alt="Front sprite"
                />
                <img
                  :src="`${backEndUrl}${pokemon?.sprites.back}`"
                  alt="Back sprite"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      backEndUrl: process.env.VUE_APP_BACKEND_URL || "http://localhost:3000",
    };
  },
  methods: {
    typesBgColor(type) {
      const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
      };

      const typeColor = typeColors[type] || "black";
      let textColor = this.wc_hex_is_light(typeColor) ? "black" : "white";

      return `background-color: ${typeColor}; color: ${textColor}`;
    },
    wc_hex_is_light(color) {
      const hex = color.replace("#", "");
      const c_r = parseInt(hex.substring(0, 0 + 2), 16);
      const c_g = parseInt(hex.substring(2, 2 + 2), 16);
      const c_b = parseInt(hex.substring(4, 4 + 2), 16);
      const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
      return brightness > 155;
    },
  },
};
</script>

<style scoped>
.modal {
  color: black;
}
.pokemon-info {
  text-align: left;
}
</style>
