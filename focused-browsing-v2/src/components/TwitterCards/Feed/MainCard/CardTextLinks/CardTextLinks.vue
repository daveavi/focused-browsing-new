<template>
  <div class="card-text-links">
    <a href="" @click="openGrey" class="about-grey"> 
      <p class="about">About Grey Software</p>
    </a>
    
    <a href="" @click="openFocusedBrowsing">
      <p class="about">About Focused Browsing</p>
    </a>
  </div>
</template>

<script>
export default {
  name: "CardTextLinks",
  data () {
    return{

    }
  }, 
  methods: {
    openGrey(){
      window.open("https://org.grey.software/");
    },
    openFocusedBrowsing(){
      window.open("https://hackmd.io/mSFA7Bh_QNivFQmDJsNP6Q")
    }

  }
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';

.card-text-links {
  margin-left: 15px;
  display: flex;
  align-items: flex-start;
}

.about{
  color: $gray-2;
  text-align: center;
  text-decoration: underline;
  letter-spacing: -0.18px;
  @include inter-12-medium;
  &:not(:last-of-type) {
    margin-right: 48px;
  }
}
.about-grey {
  margin-right:40px
}
a { color: inherit; text-decoration: none;} 
</style>