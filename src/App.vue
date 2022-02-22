<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="bg-white dark:bg-black">
    <header class="flex justify-between items-center h-16 bg-navbar font-bold">
      <RouterLink to="/">
        <h2 class="text-title text-xl ml-4">FindMoovy</h2>
      </RouterLink>
      <div class="flex items-center justify-between">
        <RouterLink to="/watchlist">
          <div class="text-white font-semibold bg-searchbar rounded-xl p-2 mr-4">🔖</div>
        </RouterLink>
        <a
          href="https://github.com/amkhrjee/findmoovy"
          alt="Link to github repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img class="w-6 mr-4" src="./assets/ghlogo.png" alt="github logo" />
        </a>
      </div>
    </header>
    <div class="h-screen flex justify-between flex-col">
      <main class="h-auto">
        <RouterView />
      </main>
      <footer class="relative bottom-0 text-grey flex justify-center">
        <span class="text-sm p-4">
          Made with
          <a
            href="https://vuejs.org"
            target="_blank"
            rel="noopener noreferrer"
            style="color: #42b883; margin: 0; padding: 0"
            >Vue3</a
          >
          & 🍵 by
          <a href="https://www.twitter.com/amkhrjee" target="_blank">amkhrjee</a>
        </span>
      </footer>
    </div>
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

footer a {
  text-decoration: none;
  color: #1da1f2;
}
</style>
