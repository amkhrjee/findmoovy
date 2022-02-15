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
  font-family: "Inter", sans-serif;
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
footer {
  position: absolute;
  bottom: 0;
  color: #758283;
  left: 50%;
}
footer span {
  font-size: 0.75rem;
  position: relative;
  left: -50%;
  bottom: 1rem;
}
footer a {
  text-decoration: none;
  color: #1da1f2;
}
</style>
