<template>
  <div class="focus-container">
    <div class="viewport-card">
      <div class="card-container">
        <div class="card-main">
          <div class="card-heading">
            <div class="card-icon">
              <img
                alt=""
                class="vector"
                src="https://static.overlay-tech.com/assets/eaad4a42-ec43-44da-b9a1-7ac938cbe85c.svg"
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
            <div class="card-button-primary">
              <p class="support-this-project">
                Support this project
              </p>
            </div>
            <div class="card-button-secondary">
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
  name: "FocusContainerTwitterLight"
};
</script>

<style lang="scss" scoped>
@import url('https://rsms.me/inter/inter.css');

$black: rgba(19, 19, 19, 1);
$black-1: rgba(0, 0, 0, 1);
$black-2: rgba(20, 20, 20, 1);
$gray: rgba(144, 144, 144, 1);
$gray-2: rgba(135, 135, 135, 1);
$gray-3: rgba(129, 132, 137, 1);
$lavender: rgba(231, 234, 238, 1);
$light-steel-blue: rgba(188, 178, 255, 1);
$orange: rgba(255, 182, 29, 1);
$primary-1: rgba(45, 108, 223, 1);
$transparent-black: rgba(19, 19, 19, 0.15);
$white: rgba(255, 255, 255, 1);
$white-2: rgba(254, 254, 254, 1);

// Typographies
@mixin inter-12-medium {
  font-family: "Inter";
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}
@mixin inter-14-medium {
  font-family: "Inter";
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
}
@mixin inter-14-regular {
  font-family: "Inter";
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}
@mixin inter-14-semi-bold {
  font-family: "Inter";
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
}
@mixin inter-16-regular {
  font-family: "Inter";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
@mixin inter-18-medium {
  font-family: "Inter";
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
}
@mixin inter-18-regular {
  font-family: "Inter";
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
}

.focus-container {
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
.card-button-primary {
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
.card-button-secondary {
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