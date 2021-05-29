<template>
  <div class="button-group">
    <Support />
    <ShowFeed />
  </div>
</template>

<script>
import Support from './Buttons/Support.vue'
import ShowFeed from './Buttons/ShowFeed.vue'
export default {
  name: "ButtonGroup",
  components: {Support, ShowFeed}
};
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>