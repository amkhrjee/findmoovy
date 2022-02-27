<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { NSwitch, NButton } from "naive-ui";
import { Sun, Moon, Bookmark } from "@vicons/fa";
import { Icon } from "@vicons/utils";
const darkMode = ref(true);

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
    if (focused) {
      style.boxShadow = "0 0 0 2px #da4163";
    }
  } else {
    style.background = "#2080f0";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
};
</script>

<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="bg-white dark:bg-black">
      <header class="flex justify-between items-center h-16 bg-navbar font-bold">
        <RouterLink to="/">
          <h2 class="text-title text-xl ml-4">FindMoovy</h2>
        </RouterLink>

        <div class="flex items-center justify-between mr-2">
          <!-- Mode toggle -->

          <n-switch class="mr-4" v-model:value="darkMode" size="large" :rail-style="railStyle">
            <template #checked-icon>
              <Icon color="#808080">
                <Moon />
              </Icon>
            </template>
            <template #unchecked-icon>
              <Icon color="#da4163">
                <Sun />
              </Icon>
            </template>
          </n-switch>
          <!-- Watchlist button -->
          <RouterLink to="/watchlist">
            <n-button strong circle secondary type="error" class="mr-4">
              <Icon>
                <Bookmark />
              </Icon>
            </n-button>
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
        <footer class="relative bottom-0 text-grey flex justify-center dark:bg-black">
          <span class="text-sm p-4">
            Made with
            <a
              href="https://vuejs.org"
              target="_blank"
              rel="noopener noreferrer"
              style="color: #42b883; margin: 0; padding: 0"
            >Vue3</a>
            & 🍵 by
            <a href="https://www.twitter.com/amkhrjee" target="_blank">amkhrjee</a>
          </span>
        </footer>
      </div>
    </div>
  </div>
</template>

<style>
*,
::after,
::befor *,
::after,
::befor *,
::after *,
::after,
::befor *,
::after,
::befor *,
::after *,
::after,
::befor *,
::after,
::befor *,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
  -webkit-tap-highlight-color: transparent;
}
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #242b2e;
}
footer a {
  text-decoration: none;
  color: #1da1f2;
}
</style>