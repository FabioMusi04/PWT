<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <!-- Player's Pokemon details -->
          <div class="card">
            <div class="card-body">
              <!-- Display player's Pokemon image, name, level, etc. -->
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <!-- Opponent's Pokemon details -->
          <div class="card">
            <div class="card-body">
              <!-- Display opponent's Pokemon image, name, level, etc. -->
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
  rivalInfo: {
    name: "Gary",
    pokemon: [
      {
        name: "Blastoise",
        level: 50,
        hp: 100,
        moves: [
          { name: "Hydro Pump", type: "Water", power: 110 },
          { name: "Ice Beam", type: "Ice", power: 90 },
          { name: "Earthquake", type: "Ground", power: 100 },
          { name: "Surf", type: "Water", power: 90 },
        ],
      },
      {
        name: "Alakazam",
        level: 48,
        hp: 90,
        moves: [
          { name: "Psychic", type: "Psychic", power: 90 },
          { name: "Shadow Ball", type: "Ghost", power: 80 },
          { name: "Thunder Punch", type: "Electric", power: 75 },
          { name: "Recover", type: "Normal", power: 0 },
        ],
      },
      {
        name: "Arcanine",
        level: 45,
        hp: 80,
        moves: [
          { name: "Flamethrower", type: "Fire", power: 90 },
          { name: "Extreme Speed", type: "Normal", power: 80 },
          { name: "Crunch", type: "Dark", power: 80 },
          { name: "Dig", type: "Ground", power: 80 },
        ],
      },
    ],
  },
  playerInfo: {},
};
</script>

<style scoped>
/* Your custom styles here */
</style>
