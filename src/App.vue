<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">
      <h2>FindMoovy</h2>
    </RouterLink>
    <RouterLink to="https://github.com/amkhrjee/findmoovy">
      <img class="gh-logo" src="./assets/ghlogo.png" alt="github logo" />
    </RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <span>
      Made with
      <span style="color: #42b883; margin: 0; padding: 0">Vue3</span> & 🍵 by
      <a href="https://www.twitter.com/amkhrjee" target="_blank">amkhrjee</a>
    </span>
  </footer>
</template>

<style>
*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
}
body {
  background-color: #000000;
}

header {
  display: flex;
  font-weight: 600;
  background-color: #0a1128;
  height: 4em;
  justify-content: space-between;
  align-items: center;
}
.gh-logo {
  width: 1.5rem;
  margin-right: 1rem;
}
header h2 {
  color: #da4167;
  margin-left: 1rem;
}
a {
  text-decoration: none;
}
main {
  height: auto;
}
footer {
  position: relative;
  bottom: 0;
  color: #758283;
  display: flex;
  justify-content: center;
}
footer span {
  font-size: 0.8rem;
  padding: 1rem;
}
footer a {
  text-decoration: none;
  color: #1da1f2;
}
</style>
