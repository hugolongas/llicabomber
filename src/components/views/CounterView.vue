<template>
  <div>    
    <h1 class="bomber-title">JUGUESCABOMBER</h1>
    <p class="bomber-subtitle">Benvinguts a la fi de la Juguesca</p>
    <div class="bombtimer-container">
      <DownCounter :endDate="item.end_date" :colla="item.colla_id" v-for="item in bombs" :key="item.id"/>
    </div>
    <router-link :to="{ name: 'login' }" class="bomber-accedir">ACCEDEIX</router-link>
  </div>
</template>
<script>

import DownCounter from "@/components/parts/DownCounter.vue";

export default {
  name: "CounterView",
  components: { DownCounter },
  computed: {
    bombs() {
        window.console.log(this.$store);
      return this.$store.getters.getBombs;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$store.dispatch("getBombs");
    },
  },
};
</script>

<style>
</style>