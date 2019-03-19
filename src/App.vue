<template>
  <div id="app">
    <TheHeader/>
    <div id="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue'

export default {
  name: 'app',
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
@import "~font-awesome/scss/font-awesome";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
  background-color: #e1e1e1;
}
.alert {
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
