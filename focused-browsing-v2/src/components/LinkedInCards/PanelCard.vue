<template>
  <div class="card-right">
    <div class="illustration-yoga-relax">
      <div class="flex-wrapper-four">
        <div class="group"></div>
      </div>
      <div class="flex-wrapper-five">
        <img
          alt=""
          class="blob"
          src="https://static.overlay-tech.com/assets/5bc100a7-c6ea-4316-9629-358a47b8bff0.svg"
        /><img
          alt=""
          class="stroke"
          src="https://static.overlay-tech.com/assets/b62ce376-4d2a-4627-bb98-a47b5f14984e.svg"
        /><img
          alt=""
          class="whites"
          src="https://static.overlay-tech.com/assets/53188804-2936-428c-8f20-b211c02c34b2.svg"
        /><img
          alt=""
          class="stroke-two"
          src="https://static.overlay-tech.com/assets/b9920f3f-95af-4888-983b-37abe2694c75.svg"
        />
        <div class="group-3">
          <div class="relative-wrapper-two">
            <img
              alt=""
              class="whites-two"
              src="https://static.overlay-tech.com/assets/3f94bf12-4145-4f5e-bc86-31f4b5edeb98.svg"
            /><img
              alt=""
              class="whites-three"
              src="https://static.overlay-tech.com/assets/d86815f3-ca16-47eb-b163-695f3b62c460.svg"
            /><img
              alt=""
              class="shadow"
              src="https://static.overlay-tech.com/assets/67856956-8f6f-4d62-a5f8-a1afdd3c75c2.svg"
            />
            <div class="flex-wrapper-three">
              <div class="group-two">
                <div class="highlights"></div>
              </div>
            </div>
          </div>
          <div class="relative-wrapper-one">
            <div class="flex-wrapper-one">
              <img
                alt=""
                class="shadow-two"
                src="https://static.overlay-tech.com/assets/89f3d75f-43ea-498f-8704-040bd5615ee1.svg"
              /><img
                alt=""
                class="whites-four"
                src="https://static.overlay-tech.com/assets/e1b93117-c680-4471-bb48-d68e6b65e985.svg"
              />
            </div>
            <div class="flex-wrapper-two">
              <img
                alt=""
                class="whites-five"
                src="https://static.overlay-tech.com/assets/b5d258b7-e47a-4fa7-9dcb-95343424974b.svg"
              />
            </div>
            <img
              alt=""
              class="whites-six"
              src="https://static.overlay-tech.com/assets/ed7a101c-0b46-4a63-8dc9-d53bcaae1bd8.svg"
            />
          </div>
          <img
            alt=""
            class="whites-seven"
            src="https://static.overlay-tech.com/assets/3f4adbf2-801e-45e4-ac7d-ef521fc2dd7f.svg"
          />
        </div>
        <img
          alt=""
          class="whites-eight"
          src="https://static.overlay-tech.com/assets/5f4ba60a-cf75-44a7-b124-9acf4b703a62.svg"
        /><img
          alt=""
          class="highlights-two"
          src="https://static.overlay-tech.com/assets/69806b5c-945a-425d-91dd-70893ec05644.svg"
        /><img
          alt=""
          class="stroke-three"
          src="https://static.overlay-tech.com/assets/c7d52f41-c196-46b0-a453-1764f31b524d.svg"
        />
        <div class="base"></div>
        <div class="shadow-three"></div>
        <img
          alt=""
          class="stroke-four"
          src="https://static.overlay-tech.com/assets/ce3ae1b9-b0fd-43a6-bdd5-8f7fd140f961.svg"
        />
      </div>
    </div>
    <p class="random-quote">
      “ Amet minim mollit non deserunt ullamco est sit
      aliqua dolor do amet sint. Velit officia consequat
      duis enim velit mollit. ”
    </p>
  </div>
</template>

<script>
export default {
  name: "CardRightLinkedIn"
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

.card-right {
  background-color: $white;
  border-radius: 16px;
  padding: 8px 15px 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.illustration-yoga-relax {
  height: calc(71.76% - 55.28px);
  margin-bottom: 13px;
  padding: 27.82px 44.75px 27.46px 44.74px;
  align-self: stretch;
  position: relative;
}
.flex-wrapper-four {
  background-size: 100% 100%;
  background-position: center;
  background-image: url("https://static.overlay-tech.com/assets/a81bace8-4e36-47e1-afa3-e3879e006927.svg");
  padding: 10.66px 0.95px 0.94px 0.94px;
  display: flex;
  align-items: flex-start;
  position: absolute;
  left: 60.06px;
  bottom: 27.45px;
}
.group {
  width: 160.23px;
  height: 16.73px;
  background-color: $lavender;
  border-radius: 50%;
}
.flex-wrapper-five {
  padding: 16.92px 0 17.29px;
  position: relative;
}
.blob {
  width: 100%;
  height: 100%;
  position: relative;
}
.stroke {
  width: 84.21%;
  height: 100%;
  position: absolute;
  left: 15.32px;
  top: 0;
}
.whites {
  width: 24.36%;
  height: 34.03%;
  position: absolute;
  left: 19.93px;
  bottom: 13.08px;
}
.stroke-two {
  width: 47.58px;
  height: 78.53px;
  position: absolute;
  left: 19.24px;
  bottom: 12.7px;
}
.group-3 {
  padding: 0 0 0 9.4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  left: 87.24px;
  top: 17.3px;
}
.relative-wrapper-two {
  margin-bottom: 59.1px;
  position: relative;
}
.whites-two {
  width: 21.12%;
  height: 13.85%;
  position: absolute;
  left: -4.14px;
  bottom: 14.3px;
}
.whites-three {
  width: 18.31%;
  height: 13.85%;
  position: absolute;
  right: -4.51px;
  bottom: 13.92px;
}
.shadow {
  width: 101.39%;
  height: 26.72%;
  position: absolute;
  right: -0.37px;
  top: 8.65px;
}
.flex-wrapper-three {
  background-size: 100% 100%;
  background-position: center;
  background-image: url("https://static.overlay-tech.com/assets/fa201629-dfbc-4811-bb78-e20ffe8a8309.svg");
  padding: 25.57px 4.52px 9.03px 5.64px;
  position: relative;
}
.group-two {
  position: relative;
  border-left: 4px solid $orange;
}
.highlights {
  width: 33.01%;
  height: 100%;
  background-color: $orange;
  border-radius: 50%;
  position: absolute;
  left: 8.41px;
  top: 0;
}
.relative-wrapper-one {
  margin-bottom: 0.68px;
  margin-left: 0.6px;
  position: relative;
}
.flex-wrapper-one {
  background-size: 100% 100%;
  background-position: center;
  background-image: url("https://static.overlay-tech.com/assets/1ab7b0df-4c09-4a89-b9f0-ea7a23317bc8.svg");
  padding: 1.34px 19.82px 0.19px 0;
  display: flex;
  align-items: flex-start;
  position: relative;
}
.shadow-two {
  width: 15.79%;
  align-self: stretch;
  margin-right: 10.39px;
  object-fit: cover;
}
.whites-four {
  width: 51.05%;
  height: 22.78%;
  margin-top: 23.5px;
}
.flex-wrapper-two {
  background-size: 100% 100%;
  background-position: center;
  background-image: url("https://static.overlay-tech.com/assets/4cfe7160-7ba6-4edc-abd1-b3db510ad024.svg");
  padding: 2.16px 0.01px 7.37px 23.64px;
  display: flex;
  align-items: flex-start;
  position: absolute;
  left: -9.58px;
  top: -57.35px;
}
.whites-five {
  height: 100%;
  flex: 1;
  object-fit: cover;
}
.whites-six {
  width: 46.77%;
  height: 67.98%;
  position: absolute;
  left: -10px;
  top: -60.23px;
}
.whites-seven {
  width: 9.37%;
  height: 2.45%;
  margin-left: 5px;
}
.whites-eight {
  width: 8.63%;
  height: 18.39%;
  position: absolute;
  left: 60.92px;
  bottom: 24.46px;
}
.highlights-two {
  width: 52.59px;
  height: 42.66px;
  position: absolute;
  left: 22.4px;
  bottom: 41.91px;
}
.stroke-three {
  width: 9.12%;
  height: 18.73%;
  position: absolute;
  left: 60.53px;
  bottom: 24.08px;
}
.base {
  width: 15.24%;
  height: 9.62%;
  background-color: $white;
  border-radius: 50%;
  position: absolute;
  left: 47px;
  bottom: 9.76px;
}
.shadow-three {
  width: 9.18%;
  height: 9.62%;
  background-color: $lavender;
  border-radius: 50%;
  position: absolute;
  left: 47px;
  bottom: 9.76px;
}
.stroke-four {
  width: 30.27px;
  height: 22.75px;
  position: absolute;
  left: 46.53px;
  bottom: 9.29px;
}
.random-quote {
  height: 24.94%;
  width: 93.62%;
  color: $gray-3;
  display: flex;
  text-align: center;
  letter-spacing: -0.24px;
  @include inter-16-regular;
}
</style>