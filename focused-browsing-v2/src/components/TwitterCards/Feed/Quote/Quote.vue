<template>
  <div class="quote-container">
    <p class="quote">
      <strong class="quote-emphasis-0"></strong>"{{this.quote}}"<strong class="quote-emphasis-0">
    </p>
    <p class="quoter">- {{this.author}}</p>
  </div>
</template>

<script>
import {quoteInfo} from './quoteInfo.js';
export default {
  name: "QuoteContainer",
  data() {
    return{
      quoteInfo: quoteInfo,
      quote: "",
      author: ""
    }
  },

  mounted() {
    this.setQuote()
  },

  methods: {
    setQuote() {
      let randNum = Math.floor(Math.random() * this.quoteInfo.length)
      this.quote = this.quoteInfo[randNum]['text']
      this.author = this.quoteInfo[randNum]['source']
    }
  }


  
};
</script>

<style lang="scss" scoped>
@import "@/abstracts/_variables.scss";
.quote-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
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