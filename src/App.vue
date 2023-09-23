<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
    rel="stylesheet" />

  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, "Lato", "Montserrat",
    "" Roboto "", "Playfair Display";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  font-family: "Lato", sans-serif;
}

body {
  background-color: #f0f0f0;
}

nav {
  padding: 30px;
}

h1,
h2,
h3 {
  font-family: "Playfair Display", serif;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
