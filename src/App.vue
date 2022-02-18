<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">
      <h2>FindMoovy</h2>
    </RouterLink>
    <a
      href="https://github.com/amkhrjee/findmoovy"
      alt="Link to github repo"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img class="gh-logo" src="./assets/ghlogo.png" alt="github logo" />
    </a>
  </header>
  <div class="wrapper">
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
  </div>
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
  font-size: 13px;
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
.wrapper {
  height: 90vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
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
