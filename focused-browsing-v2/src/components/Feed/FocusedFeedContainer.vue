<template>
  <div class="focus-container-twitter">
    <div class="viewport-card">
      <div class="card-container">
       <MainCard />
       <Quote />
      </div>
    </div>   
  </div>
</template>

<script>

import MainCard from './MainCard/MainCard.vue'
import Quote from './Quote/Quote.vue'

export default {
  name: "FocusedFeedContainer",
  components: { MainCard, Quote }
};
</script>

<style lang="scss" scoped>
</style>