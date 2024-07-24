<template>
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fcfdff;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #00ff7b;
  text-shadow: 0.1px 0.1px 0 #000, -1px -1px 0 #000, 0.1px -1px 0 #000,
    -1px 0.1px 0 #000, 0.1px 0.1px 0 #000;
}

nav a.router-link-exact-active {
  color: #42b983;
}

html,
body {
  height: 100%;
  background: linear-gradient(
      rgba(24%, 48%, 80%, 0.9),
      rgba(24%, 48%, 80%, 0.9)
    ),
    url("http://wallpapercave.com/wp/ZqCwNUM.jpg");
}
</style>
