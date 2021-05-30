<template>
    <div class="card-heading">
      <div class="card-icon">
        <img
          alt=""
          class="vector"
          src="https://static.overlay-tech.com/assets/309ddddd-a123-4f92-b267-ca48fd1d5be4.svg"
        />
      </div>
      <p class="heading">
        Focused Browsing is active
      </p>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "CardHeading"
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';

.card-heading {
  margin-bottom: 12px;
  margin-left: 43px;
  display: flex;
  align-items: center;
}
.card-icon {
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
  color: $primary-1;
  letter-spacing: -0.27px;
  @include inter-18-medium;
}
</style>