<template>
  <div class="button-show-feed">
    <p class="show-feed-text">Show Feed</p>
  </div>
</template>

<script>
export default {
  name: "ShowFeed"
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';
.button-show-feed {
  overflow: hidden;
  border-radius: 8px;
  padding: 13px 116px 12px 115px;
  display: flex;
  align-items: center;
  border: 1px solid $black;
  cursor: pointer;
}
.show-feed-text {
  color: $black;
  letter-spacing: -0.21px;
  @include inter-14-semi-bold;
}
</style>