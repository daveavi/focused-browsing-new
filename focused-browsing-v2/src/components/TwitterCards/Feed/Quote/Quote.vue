<template>
  <div class="quote-container">
    <p class="quote">
      <strong class="quote-emphasis-0">“ </strong>Amet minim
      mollit non deserunt ullamco est sit aliqua dolor do
      amet sint. Velit officia consequat duis enim velit
      mollit.<strong class="quote-emphasis-0"> ”</strong>
    </p>
    <p class="quoter">- probably someone, year !&#64;#%</p>
  </div>
</template>

<script>
export default {
  name: "QuoteContainer"
};
</script>

<style lang="scss" scoped>
@import "@/abstracts/_variables.scss";
.quote-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.quote {
  height: 53.52%;
  align-self: stretch;
  display: flex;
  text-align: center;
  margin-bottom: 12px;
  color: $gray;
  @include inter-14-regular;
}
.quote-emphasis-0 {
  color: $black;
  letter-spacing: -0.21px;
  @include inter-14-regular;
}
.quoter {
  width: 48.84%;
  height: 29.58%;
  color: $black-1;
  margin-left: 216px;
  letter-spacing: -0.21px;
  @include inter-14-medium;
}
</style>