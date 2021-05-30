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
  name: "FeedCard",
  components: { MainCard, Quote }
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';
.focus-container-twitter {
  background-color: $white;
  padding: 59px 0 60px;
  display: flex;
  align-items: center;
}
.viewport-card {
  background-color: $white;
  padding: 86px 84px 76px 83px;
  display: flex;
  align-items: flex-start;
}
.card-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>