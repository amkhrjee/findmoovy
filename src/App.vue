<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">
      <h2>FindMoovy</h2>
    </RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <span>
      Made with 🍵 by
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
  justify-content: center;
  align-items: center;
}
header h2 {
  color: #da4167;
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
