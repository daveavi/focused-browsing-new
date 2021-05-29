<template>
  <div class="focus-container-twitter">
    <div class="viewport-card">
      <div class="card-container">
        <div class="card-main">
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
          <p class="card-subtitle">
            This web extension helps you focus on your
            creative and professional goals by hiding
            distracting web elements on popular websites on
            the internet.
          </p>
          <div class="button-group">
            <div class="button-primary">
              <p class="support-this-project">
                Support this project
              </p>
            </div>
            <div class="button-secondary">
              <p class="show-feed">Show Feed</p>
            </div>
          </div>
          <div class="card-text-links">
            <p class="about-grey-software">
              About Grey Software
            </p>
            <p class="about-grey-software">
              About Focused Browsing
            </p>
          </div>
        </div>
        <div class="card-container">
          <p class="quote">
            <strong class="quote-emphasis-0">“ </strong>Amet
            minim mollit non deserunt ullamco est sit aliqua
            dolor do amet sint. Velit officia consequat duis
            enim velit mollit.<strong
              class="quote-emphasis-0"
            >
              ”</strong
            >
          </p>
          <p class="quoter">
            - probably someone, year !&#64;#%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FocusContainerTwitter"
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';
.focus-container-twitter {
  background-color: $white;
  padding: 59px 0 60px;
  display: flex;
  align-items: center;
}
.viewport-card {
  background-color: $white;
  padding: 106px 84px 76px 83px;
  display: flex;
  align-items: flex-start;
}
.card-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-main {
  background-color: $white;
  margin-bottom: 42px;
  overflow: hidden;
  border-radius: 16px;
  padding: 32px 44px 34px;
  box-shadow: 0 4px 12px 0 $transparent-black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 304px;
  width: 344px;
}
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
.button-group {
  margin-bottom: 33px;
  margin-left: 19px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.button-primary {
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
.button-secondary {
  overflow: hidden;
  border-radius: 8px;
  padding: 13px 116px 12px 115px;
  display: flex;
  align-items: center;
  height: 21px;
  width: 73px;
  border: 1px solid $black;
}
.show-feed {
  color: $black;
  letter-spacing: -0.21px;
  @include inter-14-semi-bold;
}
.card-text-links {
  margin-left: 15px;
  display: flex;
  align-items: flex-start;
}
.about-grey-software {
  color: $gray-2;
  text-align: center;
  text-decoration: underline;
  letter-spacing: -0.18px;
  @include inter-12-medium;
  &:not(:last-of-type) {
    margin-right: 48px;
  }
}
.quote {
  height: 38px;
  width: 432px;
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
  color: $black-1;
  margin-left: 216px;
  letter-spacing: -0.21px;
  @include inter-14-medium;
}
</style>