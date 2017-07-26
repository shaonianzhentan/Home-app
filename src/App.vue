<template>
  <div id="app">
    <div id="app-progress">
      <mu-linear-progress color="#a4c639" v-if="IsLoading" />
    </div>
    <router-view v-on:loading="loading"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        IsLoading: false
      }
    },
    methods: {
      loading (flag) {
        this.IsLoading = flag
      }
    }
  }
</script>

<style>
  #app {height:100%;}
  #app-progress .mu-linear-progress{position: fixed;width:100%;top:56px;background:white;}
</style>
