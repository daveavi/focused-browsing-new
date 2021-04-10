<template>
  <div id="q-app">
    <button v-on:click="hideFeed">{{enable}}</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      focus: false,
      enable: 'focus'
    }
  },

  methods:{
    hideFeed(){
      this.$q.bex.send(this.enable)
      this.focus = !this.focus
      if(this.focus){
        this.enable = 'un-focus'
      }else{
        this.enable = 'focus'
      }

    }
  }
}

</script>
<style>
#q-app {
  background-color:red;
  color:white;
  margin:5px;
  padding-left: 3px;
  border:1px solid white;
  height:100px;
}
</style>
