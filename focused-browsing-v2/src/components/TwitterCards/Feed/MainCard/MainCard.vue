<template>
  <div class="card-main">
    <CardHeading />
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
@import '@/abstracts/_variables.scss';

.card-main {
  background-color: $white;
  overflow: hidden;
  border-radius: 16px;
  padding: 32px 44px 34px;
  box-shadow: 0 4px 12px 0 $transparent-black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-subtitle {
  height: 60px;
  width: 344px;
  color: $gray;
  display: flex;
  text-align: center;
  margin-bottom: 42px;
  letter-spacing: -0.21px;
  @include inter-14-regular;
}
</style>