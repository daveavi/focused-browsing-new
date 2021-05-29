<template>
  <div class="card-heading">
    <div class="card-icon">
      <img
        alt=""
        class="vector"
        src="https://static.overlay-tech.com/assets/99dad9d7-3e9d-4ba5-b097-c985d6e66c76.svg"
      />
    </div>
    <p class="heading">Focused Browsing is active</p>
  </div>
</template>

<script>
export default {
  name: "CardHeading"
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';

.card-heading {
  display: flex;
  align-items: center;
}
.card-icon {
  width: calc(9.3% - 2px);
  height: calc(88.89% - 3.07px);
  margin-right: 7px;
  padding: 1.54px 1px 1.53px;
  display: flex;
  align-items: center;
}
.vector {
  flex: 1;
  align-self: stretch;
  object-fit: cover;
}
.heading {
  width: 87.98%;
  color: $primary-1;
  align-self: stretch;
  letter-spacing: -0.27px;
  @include inter-18-medium;
}
</style>