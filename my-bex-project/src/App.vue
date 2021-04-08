<template>
  <div id="q-app">Timeout in: {{ remainingTime }}</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      remainingTime: 60
    }
  },
  mounted() {
    setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--
      } 
      else {
        this.$q.bex.send('timeout')
      }
    }, 1000)
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
}
</style>
