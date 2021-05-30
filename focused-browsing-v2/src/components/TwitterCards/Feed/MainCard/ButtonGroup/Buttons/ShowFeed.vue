<template>
  <div class="button-show-feed">
    <a href="">
      <p class="show-feed-text">
        Show Feed
      </p>
    </a>
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
  height: 21px;
  width: 73px;
  border: 1px solid $black;
}
.show-feed-text {
  color: $black;
  letter-spacing: -0.21px;
  @include inter-14-semi-bold;
}

a { color: inherit; text-decoration: none;} 
</style>