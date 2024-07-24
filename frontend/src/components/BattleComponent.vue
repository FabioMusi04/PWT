<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <!-- Player's Pokemon details -->
          <div class="card">
            <div class="card-body">
              <!-- Display player's Pokemon image, name, level, etc. -->
              <img
                :src="`${backEndUrl}${firstPlayerPokemon?.sprites.back}`"
                alt="Pokemon Sprite"
              />
              <p>{{ firstPlayerPokemon?.name }}</p>

              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :style="{ width: firstPlayerPokemon.hp + '%' }"
                >
                  <span class="sr-only"
                    >{{ firstPlayerPokemon.currentHp }}%</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <!-- Opponent's Pokemon details -->
          <div class="card">
            <div class="card-body">
              <!-- Display opponent's Pokemon image, name, level, etc. -->
              <img
                :src="`${backEndUrl}${firstOpponentPokemon?.sprites.front}`"
                alt="Pokemon Sprite"
              />
              <p>{{ rivalInfo?.pokemons[0]?.name }}</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :style="{ width: firstOpponentPokemon.hp + '%' }"
                >
                  <span class="sr-only"
                    >{{ firstOpponentPokemon.currentHp }}%</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <!-- Player's Pokemon moves -->
          <div class="card">
            <div class="card-body">
              <!-- Display player's Pokemon moves -->
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <!-- Battle log -->
          <div class="card">
            <div class="card-body">
              <!-- Display battle log -->
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
          <!-- Battle actions -->
          <div class="card">
            <div class="card-body">
              <!-- Display battle actions (attack, switch Pokemon, etc.) -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstOpponentPokemon: this.rivalInfo?.pokemons[0]
        ? this.rivalInfo?.pokemons[0]
        : {
            sprites: {
              front: "",
            },
            hp: 0,
            currentHp: 0,
            name: "",
          },
      firstPlayerPokemon: this.$store.state.selectedPokemons[0] || {
        sprites: {
          front: "",
        },
        hp: 0,
        currentHp: 0,
        name: "",
      },
      backEndUrl: process.env.VUE_APP_BACKEND_URL || "http://localhost:3000",
    };
  },
  props: {
    rivalInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Your custom styles here */
</style>
