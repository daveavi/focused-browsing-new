<template>
  <a href="" @click="openSupport">
    <div class="button-support">
        <p class="support-this-project">
          Support this project
        </p>
    </div>
  </a>
</template>

<script>
export default {
  name: "Support",
  data () {
    return{

    }
  }, 
  methods: {
    openSupport(){
      window.open("https://github.com/sponsors/grey-software");
    }
  }
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
  color: $white-2;
}

// .button-support:hover{
//     background-color: $white;
//     color: $black;
// }
.support-this-project {
  letter-spacing: -0.21px;
  @include inter-14-semi-bold;
}
a { color: inherit; text-decoration: none;} 

</style>