
<template lang="html">
<div :class="'bombtimer '+colla">
  <img v-bind:src="'/img/'+colla+'.png'" class="bombtimer-logo" :alt="'logo-'+colla">
<div v-if="isEnded" class="bombtimer-info">
  <div class="colla-name">{{CollaName(colla)}}</div>
  <div>Boom!!</div>
</div>
<div v-else class="bombtimer-info">
  <div class="colla-name">{{CollaName(colla)}}</div>
  <div>{{days}}:{{ hours }}:{{ minutes }}:{{ seconds }}</div>
</div>
</div>
</template>
<script>
export default {
  name: "DownCounter",
  props: {
    colla: {
      type: String,
    },
    endDate: {
      type: String,
    },
  },
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      isEnded: null,
    };
  },
  methods: {
    updateRemaining(distance) {   

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    },
    tick() {
      const currentTime = new Date();
      const endTime = Date.parse(this.endDate)
      const distance = Math.max(endTime - currentTime, 0);
      this.updateRemaining(distance);
      if (distance === 0) {
        clearInterval(this.timer);
        this.isEnded = true;
      }
    },
    CollaName(colla){
      switch(colla){
        case "bisky":
          return "Bisky";
        case "cantimplora":
          return "Can T'Implora";
        case "concos":
          return "Concos";
        case "skando":
          return "Skando";
        case "sportinglolla":
          return "Sporting l'Olla";
      }
    }
  },
  mounted() {
    this.tick();
    this.timer = setInterval(this.tick.bind(this), 1000);
  },
  destroy() {
    clearInterval(this.timer);
  },
};
</script>