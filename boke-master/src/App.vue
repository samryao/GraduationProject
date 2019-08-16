<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>

  </div>
</template>

<script>
  export default {
    name: 'App',
    provide(){
      return{
        reload: this.reload
      }
    },

    data () {
      return {
        isRouterAlive: true
      }
    },

    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      }
    },

















    metaInfo: {
      title: '个人博客系统',
      titleTemplate: '',
      htmlAttrs: {
        lang: 'zh'
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #444444;
    min-height: 100vh;
  }
</style>
