<template>
  <div>
    <div class="container">
      <div class="row">
        <!-- Player's Side -->
        <div class="col-md-6">
          <div class="card mt-3 battle-card">
            <!-- Player's Trainer Sprite -->
            <img
              :src="`${backEndUrl}${this.$store.state.player.sprite}`"
              alt="Player Trainer Sprite"
              class="trainer-sprite player-sprite"
            />
            <div class="card-body">
              <!-- Player's Pokemon Sprite -->
              <img
                :src="`${backEndUrl}${firstPlayerPokemon?.sprites.back}`"
                alt="Pokemon Sprite"
                class="pokemon-sprite"
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

        <!-- Opponent's Side -->
        <div class="col-md-6">
          <div class="card mt-3 battle-card">
            <!-- Opponent's Trainer Sprite -->
            <img
              :src="`${backEndUrl}${rivalInfo?.sprite}`"
              alt="Rival Trainer Sprite"
              class="trainer-sprite rival-sprite"
            />
            <div class="card-body">
              <!-- Opponent's Pokemon Sprite -->
              <img
                :src="`${backEndUrl}${firstOpponentPokemon?.sprites.front}`"
                alt="Pokemon Sprite"
                class="pokemon-sprite"
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
        <div class="col-md-12">
          <!-- Battle Logs -->
          <div class="card">
            <div class="card-body">
              <!-- Display battle log -->
              <p>{{ battleText }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <!-- Player's Actions -->
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div
                class="col-md-6"
                v-for="(option, index) in selectedMenuToDisplay"
                :key="index"
              >
                <div class="row">
                  <div class="col-md-12 mb-2">
                    <button
                      @click="actionsFn[option.action]"
                      @mouseover="battleText = option.description"
                      @mouseleave="battleText = '...'"
                      class="btn btn-primary"
                      :style="{ width: '100%', height: '100%' }"
                    >
                      {{ option.text }}
                    </button>
                  </div>
                </div>
              </div>
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
      firstPlayerPokemon: this.$store.state.player.selectedPokemons[0] || {
        sprites: {
          front: "",
        },
        hp: 0,
        currentHp: 0,
        name: "",
      },
      battleText: "...",
      backEndUrl: process.env.VUE_APP_BACKEND_URL || "http://localhost:3000",
      optionsMenu: [
        {
          text: "Fight",
          description: "Attack the opponent",
          action: "fight",
        },
        {
          text: "Bag",
          description: "Open your bag",
          action: "bag",
        },
        {
          text: "Pokemon",
          description: "Switch your Pokemon",
          action: "pokemon",
        },
        {
          text: "Quit",
          description: "Run away",
          action: "quit",
        },
      ],
      actionsFn: {
        fight: () => {
          this.battleText = "You choose to fight!";
          this.selectedMenuToDisplay = this.attacksMenu;
        },
        bag: () => {
          this.battleText = "You choose to open your bag!";
        },
        pokemon: () => {
          this.battleText = "You choose to switch your Pokemon!";
        },
        quit: () => {
          this.battleText = "You choose to run away!";
        },
      },
      attacksMenu: [],
      selectedMenuToDisplay: [],
    };
  },
  props: {
    rivalInfo: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.battleText = "Battle Begins!";
    this.selectedMenuToDisplay = this.optionsMenu;
  },
};
</script>
<style scoped>
.battle-card {
  position: relative;
  height: 300px;
}

.trainer-sprite {
  position: absolute;
  width: 100px;
  height: auto;
  z-index: 2;
}

.player-sprite {
  bottom: 0;
  left: 10%;
}

.rival-sprite {
  top: 0;
  right: 10%;
}

.pokemon-sprite {
  position: absolute;
  max-height: 150px;
  z-index: 1;
}

.col-md-6:first-child .pokemon-sprite {
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.col-md-6:last-child .pokemon-sprite {
  top: 120px;
  right: 50%;
  transform: translateX(50%);
}
</style>
