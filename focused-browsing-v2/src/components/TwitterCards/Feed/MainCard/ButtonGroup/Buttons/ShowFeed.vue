<template>
  <a href="" @click="showFeed">
    <div class="button-show-feed">
        <p class="show-feed-text">
          Show Feed
        </p>
    </div>
  </a>
</template>

<script>
export default {
  name: "ShowFeed",
  data () {
    return{

    }
  }, 
  methods: {
    showFeed(){
      chrome.runtime.sendMessage({status: "focus"}, function(response) {
          console.log(response.farewell);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/abstracts/_variables.scss';
.button-show-feed {
  overflow: hidden;
  border-radius: 8px;
  padding: 13px 116px 12px 115px;
  display: flex;
  align-items: center;
  height: 21px;
  width: 73px;
  border: 1px solid $black;
  color: $black;
}

// .button-show-feed:hover{
//     background-color: $primary-1;
//     color: $white
// }
.show-feed-text {
  // color: $black;
  letter-spacing: -0.21px;
  @include inter-14-semi-bold;
}

a { color: inherit; text-decoration: none;} 
</style>