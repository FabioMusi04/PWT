<template>
  <div class="tournament-view">
    <button class="btn btn-primary" @click="redirectToBattle">Play</button>
    <TournamentBrackets />
  </div>
</template>

<script>
import TournamentBrackets from "@/components/TournamentBrackets.vue";
export default {
  name: "TournamentView",
  components: {
    TournamentBrackets,
  },
  methods: {
    redirectToBattle() {
      this.$router.push("/battle");
    },
  },
};
</script>

<style scoped>
.brackets-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bracket {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.team {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}
</style>
