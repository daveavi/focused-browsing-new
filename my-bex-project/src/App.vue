<template>
  <div id="q-app">
    <!-- <onoff-toggle
    v-model="focus"
    onColor="#008F13"
    :shadow="false"
    /> -->
    <button :click="hideFeed">{{enable}}</button>
  </div>
</template>

<script>
// import OnoffToggle from 'vue-onoff-toggle';
export default {
  name: 'App',
  // components: {
  //   OnoffToggle
  // },
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
  // mounted() {
  //   setInterval(() => {
  //     if (this.remainingTime > 0) {
  //       this.remainingTime--
  //     } 
  //     else {
  //       this.$q.bex.send('timeout')
  //     }
  //   }, 1000)
  // }
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
