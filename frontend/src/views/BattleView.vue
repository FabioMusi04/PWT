<template>
  <Battle
    v-if="rivalInfo && Object.keys(rivalInfo).length > 0"
    :rivalInfo="rivalInfo"
  />
</template>

<script>
import Battle from "@/components/BattleComponent.vue";
import axios from "../axios/axios.js";
export default {
  data() {
    return {
      rivalInfo: {},
    };
  },
  methods: {
    fetchBattleData() {
      axios
        .get(`/trainers/${this.$route.query.opponentId}`)
        .then((response) => {
          this.rivalInfo = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  components: {
    Battle,
  },

  mounted() {
    this.fetchBattleData();
  },
};
</script>

<style scoped></style>
