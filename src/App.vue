<template>
  <div id="app">
    <router-view @stanje-prijave="autentifikacija" />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    autentifikacija (stanje) {
      if (stanje) this.$router.replace({path: '/home'});
      else  this.$router.replace({path: '/'});
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-link a {
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
