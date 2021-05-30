<template>
  <div class="card-text-links">
    <p class="about">About Grey Software</p>
    <p class="about">About Focused Browsing</p>
  </div>
</template>

<script>
export default {
  name: "CardTextLinks"
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';

.card-text-links {
  margin-left: 15px;
  display: flex;
  align-items: flex-start;
}

.about{
  color: $gray-2;
  text-align: center;
  text-decoration: underline;
  letter-spacing: -0.18px;
  @include inter-12-medium;
  &:not(:last-of-type) {
    margin-right: 48px;
  }
}
</style>