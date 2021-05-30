<template>
  <div class="card-main">
    <CardHeading  />
    <p class="card-subtitle">
      This web extension helps you focus on your creative
      and professional goals by hiding distracting web
      elements on popular websites on the internet.
    </p>
    <ButtonGroup />
    <CardTextLinks />
  </div>
</template>

<script>
import CardHeading from './Heading/CardHeading.vue'
import ButtonGroup from './ButtonGroup/ButtonGroup.vue'
import CardTextLinks from './CardTextLinks/CardTextLinks.vue'

export default {
  name: "MainCard",
  components: { CardHeading, ButtonGroup, CardTextLinks }
};
</script>

<style lang="scss" scoped>
</style>