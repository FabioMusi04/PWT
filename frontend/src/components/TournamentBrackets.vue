<template>
  <div class="tournament-brackets">
    <table class="bracket">
      <thead>
        <tr>
          <th>Left Side</th>
          <th>Round of 8</th>
          <th>Round of 4</th>
          <th>Round of 2</th>
          <th>Final</th>
          <th>Round of 2</th>
          <th>Round of 4</th>
          <th>Round of 8</th>
          <th>Right Side</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in 8" :key="'match-' + index">
          <td>
            <p v-if="leftTrainersMatch[index - 1]">
              {{ leftTrainersMatch[index - 1].player1.name }}
              <img
                :src="
                  'http://localhost:3000/' +
                  leftTrainersMatch[index - 1].player1.sprite
                "
                alt="Trainer Sprite"
              />
            </p>
            <p v-if="leftTrainersMatch[index - 1]">
              {{ leftTrainersMatch[index - 1].player2.name }}
              <img
                :src="
                  'http://localhost:3000/' +
                  leftTrainersMatch[index - 1].player2.sprite
                "
                alt="Trainer Sprite"
              />
            </p>
          </td>
          <td v-if="index % 2 === 1" rowspan="2">
            <p>Round of 8</p>
          </td>
          <td v-if="index % 4 === 1" rowspan="4">
            <p>Round of 4</p>
          </td>
          <td v-if="index % 8 === 1" rowspan="8">
            <p>Round of 2</p>
          </td>
          <td v-if="index === 1" rowspan="16">
            <p>Final</p>
          </td>
          <td v-if="index % 8 === 1" rowspan="8">
            <p>Round of 2</p>
          </td>
          <td v-if="index % 4 === 1" rowspan="4">
            <p>Round of 4</p>
          </td>
          <td v-if="index % 2 === 1" rowspan="2">
            <p>Round of 8</p>
          </td>
          <td>
            <p v-if="rightTrainersMatch[index - 1]">
              {{ rightTrainersMatch[index - 1].player1.name }}
              <img
                :src="
                  'http://localhost:3000/' +
                  rightTrainersMatch[index - 1].player1.sprite
                "
                alt="Trainer Sprite"
              />
            </p>
            <p v-if="rightTrainersMatch[index - 1]">
              {{ rightTrainersMatch[index - 1].player2.name }}
              <img
                :src="
                  'http://localhost:3000/' +
                  rightTrainersMatch[index - 1].player2.sprite
                "
                alt="Trainer Sprite"
              />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftTrainersMatch: [],
      rightTrainersMatch: [],
      finalMatch: {
        player1: { name: "", sprite: "" },
        player2: { name: "", sprite: "" },
      },
    };
  },
  mounted() {
    this.fetchTrainers();
  },
  methods: {
    fetchTrainers() {
      fetch("http://localhost:3000/tournaments")
        .then((response) => response.json())
        .then((data) => {
          this.leftTrainersMatch = data.bracket.slice(0, 8);
          this.rightTrainersMatch = data.bracket.slice(8, 16);
          this.finalMatch = data.finalMatch;
        })
        .catch((error) => {
          console.error("Error fetching trainers:", error);
        });
    },
  },
};
</script>

<style scoped>
.tournament-brackets {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.bracket {
  border-collapse: collapse;
  width: 100%;
}

.bracket th,
.bracket td {
  text-align: center;
  padding: 10px;
}

.bracket td p {
  margin: 0;
  border-bottom: 1px solid #000;
  padding: 5px;
}
</style>
