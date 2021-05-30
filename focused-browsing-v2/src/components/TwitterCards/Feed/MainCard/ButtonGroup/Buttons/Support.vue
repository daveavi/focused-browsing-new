<template>
  <div class="button-support">
    <a href="">
      <p class="support-this-project">
        Support this project
      </p>
    </a>
  </div>
</template>

<script>
export default {
  name: "Support"
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';
.button-support {
  background-color: $primary-1;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 8px;
  padding: 14px 87px 13px;
  display: flex;
  align-items: center;
  height: 21px;
  width: 132px;
}
.support-this-project {
  color: $white-2;
  letter-spacing: -0.21px;
  @include inter-14-semi-bold;
}
a { color: inherit; text-decoration: none;} 

</style>